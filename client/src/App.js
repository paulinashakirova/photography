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
      
      <div className="d-flex justify-content-center">
      <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">            
            <Link to="/addtopic">Add Topic</Link>            
            <Link to="/addphoto">Add Photo</Link>            
          </div>
        </nav>  
      </div> 
    
      
      <div className='d-flex justify-content-center'>           
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


