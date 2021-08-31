import React from 'react';
import AddTopic from './components/AddTopic';
import AddPhoto from './components/AddPhoto';
import TopicsView from './components/TopicsView';
import ImagesView from './components/ImagesView';

// import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  //
  return (
		<Router>
			<div>
				<nav className='border-2'>
					<div className='flex justify-center text-xl p-8'>
						<div className='border-2 p-5 m-3'>
							<Link to='/addtopic'>
								<h3>Add Topic</h3>
							</Link>
						</div>
						<div className='border-2 p-5 m-3'>
							<Link to='/addphoto'>
								<h3>Add Photo</h3>
							</Link>
						</div>
						<div className='border-2 p-5 m-3'>
							<Link to='/topicsview'>
								<h3>Topics View</h3>
							</Link>
						</div>
					</div>
				</nav>
				<div className='flex justify-center text-4xl p-8 m-3'>
					<h1>Karenina Photography</h1>
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
		</Router>
	);
}
