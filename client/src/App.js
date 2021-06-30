import React from 'react';
import AddTopic from './components/AddTopic';
import AddPhoto from './components/AddPhoto';
import TopicsView from './components/TopicsView';
import ImagesView from './components/ImagesView';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  //
  return (
    <Router>
      <div>
        <div className='nav justify-content-center'>
          <div className='row '>
            <nav className='text-center my-4 p-4  bg-gradient'>
              <div className='row container-fluid'>
                <div className='col'>
                  <Link to='/addtopic'>
                    <h3>Add Topic</h3>
                  </Link>
                </div>
                <div className='col'>
                  <Link to='/addphoto'>
                    <h3>Add Photo</h3>
                  </Link>
                </div>
                <div className='col'>
                  <Link to='/topicsview'>
                    <h3>Topics View</h3>
                  </Link>
                </div>
              </div>
            </nav>
            <div className='row py-4 my-3 text-center'>
              <h1>Karenina Photography</h1>
            </div>
          </div>
        </div>
        <Switch>
          <Route path='/addtopic'>
            <AddTopic />
          </Route>
          <Route path='/addphoto'>
            <AddPhoto />
          </Route>
          {/* //i am not sure about the next line */}
          {/* WHERE DO I GET TOPIC FROM? */}
          <Route path='/topicsview/:topic_id/photos'>
            {/* <Link to={`/topicsview/${topic.id}/photos`}> */}
            <ImagesView />
          </Route>
          <TopicsView />
        </Switch>
      </div>
    </Router>
  );
}
