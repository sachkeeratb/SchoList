// To create the user and store inputted data
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

// To navigate the user
import { useNavigate } from 'react-router-dom';

// To make API requests
// import axios from "axios";

export default function Contacts() {
	// To navigate the user
	const navigate = useNavigate();

	// Get the user
	const { user } = useContext(UserContext);

	/* // If the user wishes to delete their account
	const handleDelete = (userID) => {

    // Make an API request
    axios.delete(`/delete/${userID}`);

    // Clear the local and session storage
    localStorage.clear();
    sessionStorage.clear();

    // Send the user to the home page
    return(navigate('/'));
  } */

	// To store the data inputted
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});

	// If there is no user, send them to the login page to login
	if (!user) {
		return navigate('/login');
	} else {
		return (
			<>
				<div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						{/* Update account information UNFINISHED*/}
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
							placeholder={user.name}
							value={data.name}
							onChange={(event) =>
								setData({ ...data, name: event.target.value })
							}
						/>

						<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
							Email
						</label>
						<input
							className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							type='email'
							placeholder={user.email}
							value={data.email}
							onChange={(event) =>
								setData({ ...data, email: event.target.value })
							}
						/>

						<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
							Password
						</label>
						<input
							className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							type='text'
							placeholder='••••••••'
							value={data.password}
							onChange={(event) =>
								setData({ ...data, password: event.target.value })
							}
						/>

						<button
							className='mt-10 flex w-1/5 justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							type='submit'
						>
							Update Account
						</button>
					</form>
				</div>

				{/* TODO 1: Add account update functionality */}
				{/* TODO 2: Fix account deletions and add dialong box to confirm account deletions */}
			</>
		);
	}
}
