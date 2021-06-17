import React, {useState} from 'react'

export default function UserView() {
    const [chosenTopic, setChosenTopic] = useState()

    return (
        <div>
          {topics.map((topic, i) => (
            <div className='col-3 mb-4' key={i}>
             <img 
             onClick={() => setChosenTopic(topic)} 
             alt='Topic' 
             src={topic.image} 
             className='img-fluid rounded shadow' />
            </div>    
          ))}  
        </div>
    )
}
