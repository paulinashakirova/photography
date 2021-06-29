import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const errorMessage = 'There was a problem, please try again later';

export default function UserView() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className='row mt-3'>
      <div className='tab content'>
        {topics.map((topic, i) => (
          <div className='mb-4 text-center' key={i}>
            {/* this link is not working */}
            {/* it returns me all photos instead of only by id */}
            <Link to={`/topicsview/${topic.id}/photos`}>
              <div className='row justify-content-center'>
                <div className='col-6'>
                  <img alt='Topic' src={topic.image} className=' col-10 ' />
                  <label className='text-white-50'>{topic.theme}</label>
                  <p className='text-white-50'>{topic.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
