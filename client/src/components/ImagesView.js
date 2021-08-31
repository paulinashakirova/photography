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
      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setPhotos(json);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div>
        {photos
          // .filter((photo) => photo.id === id)
          .map((photo) => (
            <div key={photo.id}>
              {/* this link is not working */}
              <Link to={`/photosview/${photo.id}/topics`}>
                <div>
                  <div>
                    <img alt='' src={photo.image} />
                    <label>{photo.title}</label>
                    <label>{photo.price}</label>
                    <p>{photo.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
