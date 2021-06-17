import React, { useEffect, useState } from 'react'

const errorMessage = "There was a problem, please try again later";


export default function PhotosView() {
  const [photos, setPhotos] = useState([]); 
  const [error, setError] = useState("");  

  //Get all photos
  useEffect(() => {
    getPhotos();
 }, []);

 const getPhotos = async () => {
    setError("");
    try {
      const response = await fetch("/photos");
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
      {photos.map((photo, i) => (
          <div className='col-3 mb-4' key={i}>        
        <img 
          alt='Topic' 
          src={photo.image} 
          className='img-fluid rounded shadow' />
          <label>{photo.title}</label>
          <label>{photo.price}</label>
          </div>
      ))}
    </div>   
        </div>
    )
}
