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
            <div className=''>
              <div className=''>
                <label className=''>Theme</label>
                <input className='' name='theme' type='text' onChange={handleInputChange} />
              </div>
              <div className=''>
                <label className=''>Image</label>
                <input className='' type='text' name='image' onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <label className=''>Description</label>
              <textarea
                className=''
                type='text'
                name='description'
                onChange={handleInputChange}
              />
            </div>
            <button className=''>Add Topic</button>
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
              <label className=''>Theme</label>
            </div>
            <div className=''>
              <label className=''>Topic Id</label>
            </div>
            <div className=''></div>
          </div>

          {topics.map((topic, i) => (
            <div className='' key={i}>
              <div className=''>
                <div className=''>
                  <label className=''>{topic.theme}</label>
                </div>
                <div className=''>
                  <label className=''>{topic.id}</label>
                </div>
                <div className=''>
                  <button
                    onClick={() => deleteTopic(topic.id)}
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
