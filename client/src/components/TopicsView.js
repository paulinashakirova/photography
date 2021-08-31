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
    <div>
      <div></div>
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link to={`/topicsview/${topic.id}/photos`}>
            <div>
              <div>
                <div>
                  <img alt='Topic' src={topic.image} />
                  <div>
                    <label>
                      <div>Topic Name: {topic.theme}</div>
                    </label>
                    <label>
                      <div>Topic Description: {topic.description}</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
//----------------------------------------------------------------//
// {/* <div className='container'>
// <div className='tab content'>
//   {/* {
//       data
//         .filter((list) => list.name === name)
//         .map((list) => (
//           <div className="full-card" key={ list.id }>
//             <h2>Name: {list.name}</h2>
//             <h4>Category: {list.category}</h4>
//           </div>
//         ))}
//   </div>
//   */}
// </div>
// {topics.map((topic) => (
//   <div className=' mb-4 text-center' key={topic.id}>
//     <Link to={`/topicsview/${topic.id}/photos`}>
//       <div className='container'>
//         <div className='row'>
//           <div className='col'>
//             <img className='img-thumbnail col-8' alt='Topic' src={topic.image} />
//             <div className='row text-decoration-none'>
//               <label className='text-white-50  text-center'>
//                 <div>Topic Name: {topic.theme}</div>
//               </label>
//               <label className='text-white-50   text-center'>
//                 <div>Topic Description: {topic.description}</div>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   </div>
// ))}
// </div> */}
