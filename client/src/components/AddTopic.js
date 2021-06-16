import React, { useEffect, useState } from 'react'

const errorMessage = "There was a problem, please try again later";

export default function AddTopic() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState ([]);
  const [values, setValues] = useState({
    theme: "",    
    image: "",
    description: "",
  })

  useEffect(() => {
    getTopics();
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
    addTopic();
  };

  const addTopic = async () => {
    setError("");
    setMessage("");
    try {
      const response = await fetch("/topics", {
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
      getTopics();
    } catch (error) {
      setError(error.message);
    }
  };

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
    <div className='card card-body mt-4'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col form-group'>
            <label>Theme</label>
            <input 
            className='form-control mb-2' 
            name="theme" 
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
        </div>
        <div>
          <label>Description</label>
          <textarea 
          className="form-control mb-2"
          type="text"
          name="description"           
          onChange={handleInputChange} />
        </div>
        <button className='btn btn-primary'>Add Topic</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}

      {message && <div className="alert alert-success">{message}</div>}
    </div>  
    </div>
  )
}
