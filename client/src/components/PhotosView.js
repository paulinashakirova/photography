import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

const errorMessage = "There was a problem, please try again later";


export default function PhotosView() {
  const [photos, setPhotos] = useState([]); 
  const [error, setError] = useState("");  
  const { topic_id } = useParams();

  //Get all photos
  useEffect(() => {
    getPhotos();
 }, [topic_id]);

 const getPhotos = async () => {
    setError("");
    try {
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
         <div className="row mt-5">
      {photos.map((photo, i) => (
          <div className='col-3 mb-4 text-center' key={i}>        
        <img 
          alt='Topic' 
          src={photo.image} 
          className='img-fluid' />
          <label className="text-white-50">{photo.title}</label>
          <div className="row">
          <label className="text-white-50">{photo.price}€</label>
          </div>
          
          </div>
      ))}
    </div>   
        </div>
    )
}


