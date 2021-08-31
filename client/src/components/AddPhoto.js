import React, { useEffect, useState } from 'react';

const errorMessage = 'There was a problem, please try again later';

export default function AddPhoto() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  const [values, setValues] = useState({
    title: '',
    image: '',
    price: '',
    description: '',
    topic_id: ''
  });

  useEffect(() => {
    getPhotos();
  }, [values.topic_id]);

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    setValues((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addPhoto();
  };

  const addPhoto = async () => {
    setError('');
    setMessage('');
    try {
      //NEXT LINE
      const response = await fetch(`topics/${values.topic_id}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
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
    setError('');
    try {
      //NEXT LINE
      // const response = await fetch(`topics/${topics.id}/photos`);
      const response = await fetch(`/photos`);
      //previous line
      // console.log(values.topic_id);
      if (!response.ok) throw { message: 'you can do it' };

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
    setError('');
    try {
      const response = await fetch('/topics');
      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setTopics(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePhoto = async (id) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(`/photos/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setMessage(json.msg);

      getPhotos();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div className=''>
        <div className=''>
          <form onSubmit={handleSubmit}>
            <div className=''>
              <div className=''>
                <label className=''>Title</label>
                <input className='' name='title' type='text' onChange={handleInputChange} />
              </div>
              <div className=''>
                <label className=''>Image</label>
                <input className='' name='image' onChange={handleInputChange} />
              </div>
              <div className=''>
                <label className=''>Price</label>
                <input className='' name='price' onChange={handleInputChange} />
              </div>
            </div>
            <select
              name='topic_id'
              onChange={handleInputChange}
              className=''
              aria-label='Default select example'>
              <option selected>Select a Topic</option>
              {topics.map((topic) => (
                <option value={topic.id} key={topic.id}>
                  {topic.theme}
                </option>
                //  console.log({topic.topic_id})
              ))}
            </select>

            <div>
              <label>Description</label>
              <textarea
                className=''
                type='text'
                name='description'
                onChange={handleInputChange}
              />
            </div>
            <button className=''>Add Photo</button>
          </form>
        </div>
        
        {error && (
          <div className=''>{error}</div>
        )}

        {message && (
          <div className=''>{message}</div>
        )}
      </div>

      <div className=''>
        <div className=''>
          <div className=''>
            <div className=''>
              <label className=''>Title</label>
            </div>
            <div className=''>
              <label className=''>Photo Id</label>
            </div>
            <div className=''></div>
          </div>
          {photos.map((photo) => (
            <div className='' key={photo.id}>
              <div className=''>
                <div className=''>
                  <label className=''>{photo.title}</label>
                </div>
                <div className=''>
                  <p className=''>{photo.id}</p>
                </div>
                <div className=''>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className=''>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
