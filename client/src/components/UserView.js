import React, {useState} from 'react'

export default function UserView({topics}) {
    const [chosenTopic, setChosenTopic] = useState(topics[0])

    return (
        <div>
          {topics.map((topic, i) => (
            <div className='col-3 mb-4' key={i}>
             <img 
             onClick={() => setChosenTopic(topic)} 
             alt='Project' 
             src={topic.image} 
             className='img-fluid rounded shadow' />
            </div>    
          ))}  
        </div>
    )
}
