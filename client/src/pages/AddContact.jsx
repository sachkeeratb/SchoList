// The components to create the user and navigate the user
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

// Navigate the user away
import { useNavigate } from 'react-router-dom';

// To make queries
import { useQueryClient, useMutation } from 'react-query';

// To create the contact
import { CreateContact } from '../components/GetContacts';

/*
// To edit a contact
import { ContactContextExport } from '../../context/ContactContext'
*/

// Add a contact
export default function AddContact() {
	// To navigate the user
	const navigate = useNavigate();

	/*
	// To check if the user is here to update a contact
	const {update, setUpdate} = ContactContextExport;
	*/

	// To store whether the user wants the contact to be favourited and if the organization is non-profit or for-profit
	let bool1 = false;
	let bool2 = false;

	// To get the user and their profile
	const { user } = useContext(UserContext);

	// Create the contact with it's information
	const [contact, setContact] = useState({
		fullName: '',
		email: '',
		phoneNum: '',
		birth: '',
		org: '',
		orgType: bool1,
		resourcesAvailable: '',
		description: '',
		favourite: bool2,
		image: '',
		userID: '',
	});

	// Set the contact's user id to the user's id in order to know which user created which contact
	useEffect(() => {
		setContact({ ...contact, userID: user.id });
	}, []);

	/* 
	// If the user is here to update the contact
	useEffect(() => {
		if (update) {
			setContact({
				...contact,
				fullName: update.fullName,
				email: update.email,
				phoneNum: update.phoneNum,
				birth: update.birth,
				org: update.org,
				orgType: bool1,
				resourcesAvailable: update.resourcesAvailable,
				description: update.description,
				favourite: bool2,
				image: update.image,
				_id: update._id
			}, []);
		}
	});
	*/

	// Create the query client
	const queryClient = useQueryClient();

	// To create the contact through mutations
	const { mutate } = useMutation(CreateContact, {
		onSuccess: () => queryClient.invalidateQueries('contact'),
	});

	/*
	// Mutations to update the contact
	const {
		mutate: updateContact,
		isLoading: updateLoading,
		isError: updateError,
	} = useMutation(UpdateContact, {
		onSuccess: () => queryClient.invalidateQueries('contact'),
	});
	*/

	// Handle the user submitting the contact
	const handleSubmit = (e) => {
		e.preventDefault();
		/*
		// Update the contact if the user is editing a contact
		if (update) {
			updateContact(contact);
		} 
		*/
		// Create the contact
		mutate(contact);

		// Go back to the contacts page
		navigate('/contacts');
	};

	// Hanlde if the user wants the organization type to be non-profit or for-profit
	const handleBool1 = (bool1) => {
		if (bool1) {
			setContact({ ...contact, orgType: true });
		} else {
			setContact({ ...contact, orgType: false });
		}
	};

	// Hanlde if the user wants the contact to be a favourite contact
	const handleBool2 = (bool2) => {
		if (bool2) {
			setContact({ ...contact, favourite: true });
		} else {
			setContact({ ...contact, favourite: false });
		}
	};

	// If there is no user, navigate them to the login page
	useEffect(() => {
		!user && navigate('/login', { replace: true });
	}, [navigate, user]);

	return (
		<section>
			<div>
				<button
					className='absolute rounded-lg bg-indigo-900 hover:bg-indigo-600 font-semibold top-[7rem] left-[2rem] button px-5 text-white text-sm'
					onClick={() => navigate(-1)}
				>
					{/* Go back a page if you accidentally came here */}
					Go Back
				</button>
			</div>

			<div className='-mt-[8rem] flex items-center justify-center scale-75'>
				{/* The form to add a contact */}
				<form
					className='border-2 border-indigo-900 w-[30rem] p-5 flex flex-col gap-5 rounded-md shadow-md shadow-indigo-900 m-5 lg:m-0'
					onSubmit={handleSubmit}
				>
					<h1 className='text-center font-semibold text-xl text-indigo-900'>
						Add Contact
					</h1>

					{/* Full name */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Full Name
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='Sachkeerat Brar'
						value={contact.fullName}
						onChange={(e) => {
							setContact({ ...contact, fullName: e.target.value });
						}}
					/>

					{/* Email */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Email
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='email'
						placeholder='user@example.com'
						value={contact.email}
						onChange={(e) => setContact({ ...contact, email: e.target.value })}
					/>

					{/* Phone Number */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Phone Number
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='1234567890'
						value={contact.phoneNum}
						onChange={(e) =>
							setContact({ ...contact, phoneNum: e.target.value })
						}
					/>

					{/* Date of Birth */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Date of Birth
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='July 21, 2008'
						value={contact.birth}
						onChange={(e) => setContact({ ...contact, birth: e.target.value })}
					/>

					{/* Organization Name */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Organization
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='FBLA'
						value={contact.org}
						onChange={(e) => setContact({ ...contact, org: e.target.value })}
					/>

					{/* Non or for profit */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Non-Profit
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='checkbox'
						value={bool1}
						onChange={handleBool1}
					/>

					{/* Resources available */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Resources Available
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='A good amount of...'
						value={contact.resourcesAvailable}
						onChange={(e) =>
							setContact({ ...contact, resourcesAvailable: e.target.value })
						}
					/>

					{/* The description of the contact */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Description
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='text'
						placeholder='A truly amazing...'
						value={contact.description}
						onChange={(e) =>
							setContact({ ...contact, description: e.target.value })
						}
					/>

					{/* Saving the contact as a favourite */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Save As Favourite
					</label>
					<input
						className='border-indigo-900 border p-3 outline-none rounded-md text-sm'
						type='checkbox'
						value={bool2}
						onChange={handleBool2}
					/>

					{/* Submitting the contact's picture */}
					<label className='pt-3 block text-md font-medium text-indigo-900'>
						Picture
					</label>
					<input
						className='mx-[6rem]'
						type='file'
						onChange={(e) =>
							setContact({ ...contact, image: e.target.files[0] })
						}
					/>
					<button className='bg-indigo-900 scale-150 hover:bg-indigo-600 rounded-lg font-semibold w-1/2 ml-[7rem] h-6 button px-5 text-white text-sm'>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}
