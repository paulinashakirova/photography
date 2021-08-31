import React, { useEffect, useState } from 'react';

const errorMessage = 'There was a problem, please try again later';

export default function AddTopic() {
	const [photos, setPhotos] = useState([]);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [topics, setTopics] = useState([]);
	const [values, setValues] = useState({
		theme: '',
		image: '',
		description: ''
	});

	useEffect(() => {
		getTopics();
	}, []);

	const handleInputChange = ({ target }) => {
		const { value, name } = target;

		setValues((state) => ({
			...state,
			[name]: value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addTopic();
	};

	const addTopic = async () => {
		setError('');
		setMessage('');
		try {
			const response = await fetch('/topics', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(values)
			});
			const json = await response.json();
			if (!response.ok) {
				throw { message: json.msg };
			}
			setMessage(json.msg);
			getTopics();
		} catch (error) {
			setError(error.message);
		}
	};
	const getPhotos = async () => {
		setError('');
		try {
			const response = await fetch('/photos');
			if (!response.ok) throw { message: errorMessage };

			const json = await response.json();
			setPhotos(json);
		} catch (error) {
			setError(error.message);
		}
	};
	//Get all the Topics
	useEffect(() => {
		getPhotos();
	}, []);

	const getTopics = async () => {
		setError('');
		try {
			const response = await fetch('/topics');
			if (!response.ok) throw { message: errorMessage };

			const json = await response.json();
			setTopics(json);
		} catch (error) {
			setError(error.message);
		}
	};

	const deleteTopic = async (topic_id) => {
		setError('');
		setMessage('');

		try {
			const response = await fetch(`/topics/${topic_id}`, {
				method: 'DELETE'
			});

			if (!response.ok) throw { message: errorMessage };

			const json = await response.json();
			setMessage(json.msg);

			getTopics();
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div>
			<div>
				<div>
					<form onSubmit={handleSubmit}>
						<div className='border-2 text-xl p-4 m-4'>
							<div className='border-2 p-2 m-2'>
								<label className=''>Theme</label>
								<input className='' name='theme' type='text' onChange={handleInputChange} />
							</div>
							<div className='border-2 p-2 m-2'>
								<label className=''>Image</label>
								<input className='' type='text' name='image' onChange={handleInputChange} />
							</div>
							<div className='border-2 p-2 m-2'>
								<label>Description</label>
								<textarea className='' type='text' name='description' onChange={handleInputChange} />
							</div>
						</div>
						<button className='border-2 p-2 m-2'>Add Topic</button>
					</form>
				</div>
				{error && <div className=''>{error}</div>}

				{message && <div className=''>{message}</div>}
			</div>
			<div className=''>
				<div className='flex border-2 p-2 m-2'>
					<div className='border-2 p-2 m-2'>
						<label className=''>Theme</label>
					</div>

					{topics.map((topic, i) => (
						<div className='border flex flex-grow justify-between'>
							<div className='border p-2 m-2 ' key={i}>
								<label className=''>topic.theme{topic.theme}</label>
							</div>
							<div className='border p-2 m-2'>
								<button onClick={() => deleteTopic(topic.id)} className=''>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
