// To create the user and store inputted data
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

// To navigate the user
import { useNavigate } from 'react-router-dom';

// To make API requests
import axios from 'axios';

export default function Contacts() {
	// To navigate the user
	const navigate = useNavigate();

	// Get the user
	const { user } = useContext(UserContext);

	const handleLogout = () => {
		window.localStorage.clear();
		window.sessionStorage.clear();
		return navigate('/');
	};

	// If the user wishes to delete their account
	const handleDelete = async (userID) => {
		if (!user) {
			return navigate('/');
		}

		// Make an API request
		await axios.delete(`/delete/${userID}`);

		// Clear the local and session storage
		window.localStorage.clear();
		window.sessionStorage.clear();

		// Send the user to the home page
		return navigate('/');
	};

	/*
	// Handle the user updating themself
	const handleUpdate = async (userID) => {
		if (!user) {
			return navigate('/');
		}

		setUser({ data });
		await axios.put(`/update/${userID}`, data);

		return navigate('/');
	};

	const [data, setData] = useState({
		name: '',
		email: ''
	});

	// To store the data inputted
	useEffect(() => {
		if (user) {
			setData({
				name: user.name,
				email: user.email
			});
		}
	}, [user]);
	*/

	return (
		<>
			<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900'>
				{/* Title */}
				User Controls
			</h2>
			{/* The update user form
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900'>
						Update Account Information
					</h2>
				</div>
				<form className='flex flex-col items-center'>
					<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
						Organizational Name
					</label>
					<input
						className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						type='text'
						placeholder='Name'
						value={data.name}
						onChange={(event) => setData({ ...data, name: event.target.value })}
					/>

					<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
						Email
					</label>
					<input
						className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						type='email'
						placeholder='Email'
						value={data.email}
						onChange={(event) =>
							setData({ ...data, email: event.target.value })
						}
					/>

					<button
						className='mt-10 flex w-1/5 justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						type='submit'
						onClick={handleUpdate}
					>
						Update Account
					</button>
				</form>
			</div>
			*/}

			{/* Logout button */}
			<div className='mt-10 ml-[31.25rem] flex w-1/6 justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
				<button onClick={handleLogout}>Logout</button>
			</div>

			{/* Delete account button */}
			<div className='mt-10 ml-[31.25rem] flex w-1/6 justify-center rounded-md bg-red-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
				<button onClick={handleDelete}>Delete Account</button>
			</div>
		</>
	);
}
