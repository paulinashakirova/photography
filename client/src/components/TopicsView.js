import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const errorMessage = 'There was a problem, please try again later';

export default function UserView() {
  const [topics, setTopics] = useState([]);
  const { id } = useParams();

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
  //getPhotos by id topics?

  return (
    <div className='row mt-3'>
      <div className='tab content'>
        {/* {
            data
              .filter((list) => list.name === name)
              .map((list) => (
                <div className="full-card" key={ list.id }>
                  <h2>Name: {list.name}</h2>
                  <h4>Category: {list.category}</h4>
                </div>
              ))}
        </div> 
        */}
        {topics.map((topic) => (
          <div className='mb-4 text-center' key={topic.id}>
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

// {topics.map((topic, i) => (
//   <div className='mb-4 text-center' key={i}>
//     {/* this link is not working */}
//     {/* it returns me all photos instead of only by id */}
//     <Link to={`/topicsview/${topic.id}/photos`}>
//       <div className='row justify-content-center'>
//         <div className='col-6'>
//           <img alt='Topic' src={topic.image} className=' col-10 ' />
//           <label className='text-white-50'>{topic.theme}</label>
//           <p className='text-white-50'>{topic.description}</p>
//         </div>
//       </div>
//     </Link>
//   </div>
// ))}
