import React, { useEffect, useState } from 'react';

const errorMessage = 'There was a problem, please try again later';

export default function AddTopic() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [topics, setTopics] = useState([]);
  const [values, setValues] = useState({
    theme: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    getTopics();
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
    addTopic();
  };

  const addTopic = async () => {
    setError('');
    setMessage('');
    try {
      const response = await fetch('/topics', {
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
      getTopics();
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
    getPhotos();
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

  const deleteTopic = async (topic_id) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(`/topics/${topic_id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setMessage(json.msg);

      getTopics();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col form-group'>
                <label className='text-black-50'>Theme</label>
                <input className='form-control mb-2' name='theme' type='text' onChange={handleInputChange} />
              </div>
              <div className='col form-group'>
                <label className='text-black-50'>Image</label>
                <input className='form-control mb-2' type='text' name='image' onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <label className='text-black-50'>Description</label>
              <textarea
                className='form-control mb-2'
                type='text'
                name='description'
                onChange={handleInputChange}
              />
            </div>
            <button className='btn btn-light bg-transparent btn-sm mt-2 text-black-50'>Add Topic</button>
          </form>
        </div>
        {error && (
          <div className='alert font-monospace mb-md-0 mt-3 mt-lg-auto small  text-warning'>{error}</div>
        )}

        {message && (
          <div className='alert font-monospace mb-md-0 mt-3 mt-lg-auto small text-success'>{message}</div>
        )}
      </div>
      <div className='container'>
        <div className='list-group text-center'>
          <div className='row'>
            <div className='col'>
              <label className='text-secondary small'>Theme</label>
            </div>
            <div className='col text-center'>
              <label className='text-secondary small'>Topic Id</label>
            </div>
            <div className='col'></div>
          </div>

          {topics.map((topic, i) => (
            <div className='justify-content-between mb-4' key={i}>
              <div className='row'>
                <div className='col'>
                  <label className='text-black-50'>{topic.theme}</label>
                </div>
                <div className='col text-center'>
                  <label className='text-black-50'>{topic.id}</label>
                </div>
                <div className='col'>
                  <button
                    onClick={() => deleteTopic(topic.id)}
                    className='btn btn-sm btn-light bg-transparent text-black-50'>
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
