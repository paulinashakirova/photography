import React, { useEffect } from 'react'

const errorMessage = "There was a problem, please try again later";


export default function TopicMenu() {
    const [error, setError] = useState("");  
    const [topics, setTopics] = useState([]);  

    useEffect(() => {
        getTopics();
    }, []);

    const getTopics = () => {
            fetch("/topics")
              .then(response => response.json())
              .then(topics => {
                setTopics(topics);
              })
              .catch(error => {
                console.log(error);
              });
          };     

    return (
      <div>
        {topics.map((topic) => (
          <div 
          key={topic.topic_id}
          className="list-group-item d-flex justify-content-between align-items-center"
          >
          {topic.theme}
          </div>
        ))}   
      </div>
    )
}
