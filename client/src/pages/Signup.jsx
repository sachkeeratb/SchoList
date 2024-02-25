// To store information inputted
import { useState } from 'react';

// To make API requests
import axios from 'axios';

// To inform the user of any invalid inputs
import { toast } from 'react-hot-toast';

// To navigate the user
import { useNavigate } from 'react-router-dom';

// Signup Page
export default function Signup() {
	// To navigate the user
	const navigate = useNavigate();

	// For the user to choose if they want to see their password while typing or not
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	}

	// To store inputted data
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
	});

	// To create a user account
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Store the inputted data
		const { name, email, password } = data;

		try {
			// Make an API request to create a user
			const { data } = await axios.post('/signup', {
				name,
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
				toast.success('Registration successful. Welcome.');
				navigate('/login');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					{/* Title: Create an account */}
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-900'>
						Create An Account
					</h2>
				</div>

				{/* Create a form */}
				<form
					className='flex flex-col items-center'
					onSubmit={handleSubmit}
				>
					{/* Name input */}
					<label className='pb-3 pt-6 block text-md font-medium leading-6 text-indigo-900'>
						Organizational Name
					</label>
					<input
						className='border px-3 block w-5/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
						type='text'
						placeholder='Harold M. Brathwaite S.S.'
						value={data.name}
						onChange={(event) => setData({ ...data, name: event.target.value })}
					/>

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
						Submit
					</button>
				</form>

				<p className='mt-8 text-center text-sm text-gray-600'>
					{/* Go to the login page if the user already has an account */}
					Already have an account?{' '}
					<a
						href='/login'
						className='font-semibold leading-6 text-indigo-900 hover:text-indigo-600'
					>
						Login!
					</a>
				</p>
			</div>
		</>
	);
}
