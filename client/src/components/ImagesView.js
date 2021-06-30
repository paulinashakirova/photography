import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const errorMessage = 'There was a problem, please try again later';

export default function UserViewPhotos() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const { topic_id } = useParams();
  //Get all the Photos related to that topic
  useEffect(() => {
    getPhotos();
    // }, [photos.id]);
  }, []);

  const getPhotos = async () => {
    setError('');
    try {
      // const response = await fetch(`/photos`);
      //i think it should be mext line. but for some reson it displays correct topic but it doesnt filter by id
      const response = await fetch(`/topics/${topic_id}/photos`);
      // fetch(`/photos/${photos.id}`);
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
        {photos
          // .filter((photo) => photo.id === id)
          .map((photo) => (
            <div className='mb-4 text-center' key={photo.id}>
              {/* this link is not working */}
              <Link to={`/photosview/${photo.id}/topics`}>
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <img alt='' src={photo.image} className=' col-8 ' />
                    <div className='row'>
                      <label className='text-white-50'>Title: {photo.title}</label>
                    </div>
                    <div className='row'>
                      <label className='text-white-50'>Price{photo.price}</label>
                    </div>
                    <div className='row'>
                      <label className='text-white-50'>Description{photo.description}</label>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
