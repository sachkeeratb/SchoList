// To delete the contact and use queries on it
import { DeleteContact } from '../components/GetContacts';
import { useQueryClient, useMutation } from 'react-query';
// import { ContactContextExport } from '../../context/ContactContext';

// To navigate the user
import { useNavigate } from 'react-router-dom';

// Formatting the birth date
import moment from 'moment';

// To use the context of the users/contacts
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

// Icons
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
// import { MdEdit } from 'react-icons/md';

// The contact
const Contact = ({ contact }) => {
	// To navigate users
	const navigate = useNavigate();

	// Get the user
	const { user } = useContext(UserContext);

	// Store the contact
	const {
		fullName,
		email,
		phoneNum,
		birth,
		org,
		orgType,
		resourcesAvailable,
		description,
		favourite,
		image,
		_id,
	} = contact;

	// To make queries
	const queryClient = useQueryClient();

	// To delete the user through queries
	const { mutate } = useMutation(['contact', _id], DeleteContact, {
		onSuccess: () => queryClient.invalidateQueries('contact'),
	});

	/*
	// To update the contact
	let { setUpdate } = ContactContextExport();
	const handleUpdate = () => {
		const {setUpdate} = contact;		
		return navigate('/addcontact');
	};
	*/

	// If the user created the contact, or SchoList provided a contact, show it
	if (contact.userID == user.id || !contact.userID) {
		return (
			<div className='w-[17rem] shadow-md shadow-gray-400 overflow-hidden rounded-lg'>
				{/* Show the image */}
				<img
					className='w-full h-[12rem] object-cover'
					src={'http://localhost:8000/upload/' + image}
					alt='contactImage'
				/>

				<div className='p-3 text-sm flex flex-col gap-1'>
					{/* Show the information of the contact */}
					<p>Name: {fullName}</p>
					<p>Email: {email}</p>
					<p>Phone No.: {phoneNum}</p>
					<p>Date of Birth: {moment(birth).format('l')}</p>
					<p>
						Organization: {org}, {orgType ? 'Non-Profit' : 'For-Profit'}
					</p>
					<p>Resources available: {resourcesAvailable}</p>
					<p>Description: {description}</p>

					<div className='p-3 flex items-center justify-end gap-2'>
						<p>
							{/* Show a coloured in star if the contact is favourited, else show a hollowed-out star */}
							{favourite ? (
								<FaStar style={{ color: '#312e81' }} />
							) : (
								<FaRegStar />
							)}
						</p>
						<button
							className='text-red-600 hover:opacity-75'
							onClick={() => mutate(_id)}
						>
							{/* Delete the contact */}
							{contact.userID && <FaTrashCan />}
						</button>

						{/* To edit the contact
							<button
								className='text-indigo-600 hover:opacity-75'
								onClick={handleUpdate}
							>
								<MdEdit />
							</button>
						*/}
					</div>
				</div>
			</div>
		);
	}
};

export default Contact;
