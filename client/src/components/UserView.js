import React, { useEffect, useState } from 'react'

const errorMessage = "There was a problem, please try again later";

export default function UserView() { 
  const [topics, setTopics] = useState([]); 
  const [error, setError] = useState("");  


  
  //Get all the Topics
  useEffect(() => {
    getTopics();
 }, []);
  
  const getTopics = async () => {
    setError("");
    try {
      const response = await fetch("/topics");
      if (!response.ok) throw { message: errorMessage };
  
      const json = await response.json();
      setTopics(json);
    } catch (error) {
      setError(error.message);
    }
  };

    return (
        <div className="row mt-5">          
        <div className="tab content">
        {topics.map((topic, i) => (
        <div className='col-3 mb-4' key={i}>       
          <img 
        //   onClick={() => setFeaturedProject(project)} 
          alt='Topic' 
          src={topic.image} 
          className='img-fluid rounded shadow' />
           <label>{topic.theme}</label>
        </div>
      ))} 

        </div>  
           
        </div>
    )
}
