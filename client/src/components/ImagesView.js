import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const errorMessage = 'There was a problem, please try again later';

export default function UserViewPhotos() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');

  //Get all the Photos related to that topic
  useEffect(() => {
    getPhotos();
  }, []);

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

  return (
    <div className='row mt-3'>
      <div className='tab content'>
        {photos.map((photo, i) => (
          <div className='mb-4 text-center' key={i}>
            {/* this link is not working */}
            <Link to={`/photosview/${photo.id}/topics`}>
              <div className='row justify-content-center'>
                <div className='col-6'>
                  <img alt='' src={photo.image} className=' col-10 ' />
                  <label className='text-white-50'>{photo.title}</label>
                  <label className='text-white-50'>{photo.price}</label>
                  <p className='text-white-50'>{photo.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
