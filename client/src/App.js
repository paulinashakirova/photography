import React from "react";
import AddTopic from './components/AddTopic'
import AddPhoto from './components/AddPhoto'

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  
  return (
    <Router>
    <div className="container pt-5">
      <h1 className="text-center">Karenina Photography</h1>
        <div className='d-flex justify-content'>
        <nav>
          <ul>
            <li>
              <Link to="/addtopic">Add Topic</Link>
            </li>
            <li>
              <Link to="/addphoto">Add Photo</Link>
            </li>
          </ul>
        </nav>
      <Switch>        
        <Route path="/addtopic">
          <AddTopic />
        </Route>
        <Route path="/addphoto">
          <AddPhoto />
        </Route>
      </Switch>
    </div>
  </div>
  </Router>
  );
}


