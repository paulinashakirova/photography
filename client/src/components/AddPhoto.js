import React, { useEffect, useState } from 'react'

const errorMessage = "There was a problem, please try again later";

export default function AddPhoto() {
  const [topics, setTopics] = useState([]);
  
  //Add Photo states
  const [error, setError] = useState("");  
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState ([]);
  const [values, setValues] = useState({
    title: "",    
    image: "",
    price: "",
    description: ""  
  })

  useEffect(() => {
    getPhotos();
  }, []);

  const handleInputChange = ({ target }) => {
    const { value, name } = target

    setValues((state) => ({
      ...state,
      [name]: value
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPhoto(values);
  };

  const addPhoto = async () => {
    setError("");
    setMessage("");
    try {
      const response = await fetch("/topics/topic_id/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( values ),
      });
      const json = await response.json();
      if (!response.ok) {
        throw { message: json.msg };
      }
      setMessage(json.msg);
      getPhotos();
    } catch (error) {
      setError(error.message);
    }
  };

  const getPhotos = async () => {
    setError("");
    try {
      const response = await fetch("/topics/topic_id/photos");
      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setPhotos(json);
    } catch (error) {
      setError(error.message);
    }
  };

//Get all the Topics
useEffect(() => {
  getTopics();
}, []);

const getTopics = async () => {
  setError("");
  try {
    const response = await fetch("/topics");
    if (!response.ok) throw { message: errorMessage };

    const json = await response.json();
    setTopics(json);
  } catch (error) {
    setError(error.message);
  }
};

  return (
    <div>
    <div>        
      </div>
    <div className='card card-body mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='row'>            
          <div className='col form-group'>           
            <label>Title</label>
            <input 
            className='form-control mb-2' 
            name="title" 
            type="text"            
            onChange={handleInputChange} />
          </div>
          <div className='col form-group'>
            <label>Image</label>
            <input 
            className='form-control mb-2' 
            name="image"             
            onChange={handleInputChange} />
          </div>
          <div className='col form-group'>
            <label>Price</label>
            <input 
            className='form-control mb-2' 
            name="price"             
            onChange={handleInputChange} />
          </div>          
           <select 
           className="form-select mb-2" 
           aria-label="Default select example"
          //  value={topic.theme}
          //  onChange={handleChange}
           >
           <option selected>Select a Topic</option>
           {topics.map((topic) => (
            <option key={topic.topic_id}>{topic.theme}</option>
           ))}              
           </select>
          </div>        
        <div>
          <label>Description</label>
          <textarea 
          className="form-control mb-2"
          type="text"
          name="description"           
          onChange={handleInputChange} />
        </div>
        <button className='btn btn-primary'>Add Photo</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}

      {message && <div className="alert alert-success">{message}</div>}
    </div>      
    </div>
  )
    
  
    
}
