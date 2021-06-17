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
        <div key={i}>{photo.title}</div>
      ))}
    </div>   
        </div>
    )
}
