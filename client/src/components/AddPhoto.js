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
  }, []);

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
      const response = await fetch('/photos', {
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
      const response = await fetch('/photos');
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
    // delete task from database
    // upon success, update tasks
    // upon failure, show error message
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
      <div className='card card-body mt-4 bg-transparent border-secondary mb-3'>
        <form onSubmit={handleSubmit}>
          <div className='row mb-3'>
            <div className='col form-group'>
              <label className='text-white-50'>Title</label>
              <input className='form-control mb-2' name='title' type='text' onChange={handleInputChange} />
            </div>
            <div className='col form-group'>
              <label className='text-white-50'>Image</label>
              <input className='form-control mb-2' name='image' onChange={handleInputChange} />
            </div>
            <div className='col form-group'>
              <label className='text-white-50'>Price</label>
              <input className='form-control mb-2' name='price' onChange={handleInputChange} />
            </div>
          </div>
          <select
            name='topic_id'
            onChange={handleInputChange}
            className='form-select mb-2 bg-transparent text-white-50'
            aria-label='Default select example'>
            <option selected>Select a Topic</option>
            {topics.map((topic) => (
              <option value={topic.topic_id} key={topic.topic_id}>
                {topic.theme} {topic.topic_id}
              </option>
            ))}
          </select>

          <div>
            <label className='text-white-50'>Description</label>
            <textarea
              className='form-control mb-2'
              type='text'
              name='description'
              onChange={handleInputChange}
            />
          </div>
          <button className='btn btn-light bg-transparent btn-sm mt-2 text-white-50'>Add Photo</button>
        </form>
        {error && (
          <div className='alert font-monospace mb-md-0 mt-3 mt-lg-auto small  text-warning'>{error}</div>
        )}

        {message && (
          <div className='alert font-monospace mb-md-0 mt-3 mt-lg-auto small text-success'>{message}</div>
        )}
      </div>

      <div className='list-group text-center'>
        <div className='row'>
          <div className='col'>
            <label className='text-secondary small'>Title</label>
          </div>
          <div className='col text-center'>
            <label className='text-secondary small'>Photo Id</label>
          </div>
          <div className='col'></div>
        </div>
        {photos.map((photo, i) => (
          <div className='justify-content-between mb-4' key={i}>
            <div className='row'>
              <div className='col'>
                <label className='text-white-50'>{photo.title}</label>
              </div>
              <div className='col'>
                <p className='text-white-50'>{photo.id}</p>
              </div>
              <div className='col'>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className='btn btn-sm btn-light bg-transparent text-white-50'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
