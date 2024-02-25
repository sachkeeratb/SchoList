// To get the user
import { useState } from 'react';

// To make API requests
import axios from 'axios';

// To alert the user of the successfulness of their login attempt
import { toast } from 'react-hot-toast';

// To navigate the user after they login
import { useNavigate } from 'react-router-dom';

// The Login Page
export default function Login() {
	// To navigate users
	const navigate = useNavigate();

	// For the user to choose if they want to see their password while typing or not
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	// To store and set the data the user inputs
	const [data, setData] = useState({
		email: '',
		password: '',
	});

	// To login the user
	const loginUser = async (event) => {
		event.preventDefault();

		// Store the inputted data
		const { email, password } = data;

		try {
			// Make an API request to login the user
			const { data } = await axios.post('/login', {
				email,
				password,
			});

			// Show the user if any input is invalid
			if (data.error) {
				toast.error(data.error);
			}

			// Allow the user to continue
			else {
				setData({});
				toast.success('Login successful. Welcome.');
				navigate('/contacts');
			}

			// Set a token
			localStorage.setItem('token-info', JSON.stringify(data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					{/* Title: Login */}
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900'>
						Login to your account
					</h2>
				</div>

				{/* Create a form */}
				<form
					className='flex flex-col items-center'
					onSubmit={loginUser}
				>
					{/* Email input */}
					<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
						Email
					</label>
					<input
						className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						type='email'
						placeholder='user@example.com'
						value={data.email}
						onChange={(event) =>
							setData({ ...data, email: event.target.value })
						}
					/>

					{/* Password input */}
					<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
						Password
					</label>
					<div className='relative w-2/5 right-0 flex items-center'>
						{/* Toggle password visibility */}
						<button
							className='absolute inset-y-4 right-0 flex items-center text-gray-600'
							onClick={togglePasswordVisibility}
						>
							{isPasswordVisible ? <a>🫣</a> : <a>🙈</a>}
						</button>
					</div>
					<input
						className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						type={isPasswordVisible ? 'text' : 'password'}
						placeholder='••••••••'
						value={data.password}
						onChange={(event) =>
							setData({ ...data, password: event.target.value })
						}
					/>

					{/* Submit the form */}
					<button
						className='mt-10 flex w-1/5 justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						type='submit'
					>
						Login
					</button>
				</form>

				<p className='mt-8 text-center text-sm text-gray-600'>
					{/* Go to the signup page if the user does not have an account */}
					Don&apos;t have an account?{' '}
					<a
						href='/signup'
						className='font-semibold leading-6 text-indigo-900 hover:text-indigo-600'
					>
						Sign up!
					</a>
				</p>
			</div>
		</>
	);
}
