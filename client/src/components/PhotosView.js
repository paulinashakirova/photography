import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const errorMessage = 'There was a problem, please try again later';

export default function PhotosView() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  // const topic_id = 1;

  // Get all photos
  useEffect(() => {
    const getPhotos = async () => {
      setError('');
      try {
        //i wanted to try to get all photos belonging to topics
        const response = await fetch(`/topics/${id}/photos`);
        if (!response.ok) throw { message: errorMessage };

        const json = await response.json();
        setPhotos(json);
      } catch (error) {
        setError(error.message);
      }
    };
    getPhotos();
  }, [id]);

  return (
    <div>
      <div className='row mt-5'>
        {photos.map((photo, i) => (
          <div className='col-3 mb-4 text-center' key={i}>
            <img alt='Topic' src={photo.image} className='img-fluid' />
            <label className='text-white-50'>{photo.title}</label>
            <div className='row'>
              <label className='text-white-50'>{photo.price}€</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
