// The components to create the user and navigate the user
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

// To navigate the user
import { useNavigate } from 'react-router-dom';

// To format the birth date
import moment from 'moment';

// To create queries and mutations
import { useQuery } from 'react-query';

// To get all the contacts and show them
import Contact from '../components/Contact';
import { GetAllContacts } from '../components/GetContacts';

// The Contacts Page
// This is the actual purpose of this website
export default function Contacts() {
	// To navigate the user
	const navigate = useNavigate();

	// Store the contacts
	const { data, isLoading, isError } = useQuery('contact', GetAllContacts);

	// To get the user and their profile
	const { user } = useContext(UserContext);

	// TO store what the user is searching
	const [search, setSearch] = useState('');

	// The filters the user can apply
	// Default is searching based on name
	const [filter, setFilter] = useState('fullName');

	// Handle the filter changing
	const handleChangeFilter = (e) => {
		setFilter(e.target.value);
	};

	// Handle the user searching for something
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	// If there is no user, navigate them to the login page
	useEffect(() => {
		!user && navigate('/login', { replace: true });
	}, [navigate, user]);

	if (user) {
		return (
			<div className='w-[80%] mx-auto my-[3rem] border-2 border-indigo-200 shadow-md shadow-gray-400'>
				{/* Title */}
				<h1 className='p-6 text-center flex-1 text-2xl font-bold text-indigo-900'>
					{user.name}'s Contacts
				</h1>

				<div className='relative z-0'>
					<div className='text-left ml-10 absolute z-10'>
						{/* Search box */}
						<input
							className='order px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							type='text'
							onChange={handleSearch}
							placeholder='Seach for contacts'
						/>

						{/* Filter selection */}
						<select
							name='filter'
							className='-translate-y-[2.125rem] translate-x-[12rem] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							value={filter}
							onChange={handleChangeFilter}
						>
							{/* Dropdown options */}
							<option value='fullName'>Name</option>
							<option value='email'>Email</option>
							<option value='phoneNum'>Phone No.</option>
							<option value='birth'>Date of Birth</option>
							<option value='org'>Organization</option>
							<option value='for-profit'>For-Profit</option>
							<option value='non-profit'>Non-Profit</option>
							<option value='favourite'>Favourites</option>
							<option value='created'>Created By Me</option>
						</select>
					</div>

					<div className='text-right mr-10'>
						{/* Button to create a contact */}
						<button
							className='button text-sm px-4 bg-indigo-900 py-2 text-white rounded-md hover:opacity-75'
							onClick={() => navigate('/addcontact')}
						>
							Add Contact
						</button>
					</div>
				</div>

				<div className='p-4 lg:p-7 flex items-center flex-wrap gap-4 w-[95%] mx-auto'>
					{/* If the data is loading, show that it is loading */}
					{isLoading && <p>Loading...</p>}

					{/* If there is an error, say something went wrong */}
					{isError && <p>Something went wrong.</p>}

					{/* Show the data based on filters */}
					{data?.filter((i) => {
							// If the filter is a certain thing, show that certain thing along wiht what the user searched
							if (filter === 'fullName') {
								return search === ''
									? i
									: i.fullName.toLowerCase().includes(search.toLowerCase());
							} else if (filter === 'email') {
								return search === ''
									? i
									: i.email.toLowerCase().includes(search.toLowerCase());
							} else if (filter === 'phoneNum') {
								return search === ''
									? i
									: i.phoneNum.toString().includes(search);
							} else if (filter === 'birth') {
								return search === ''
									? i
									: moment(i.birth).format('l').includes(search);
							} else if (filter === 'org') {
								return search === ''
									? i
									: i.org.toLowerCase().includes(search.toLowerCase());
							} else if (filter === 'for-profit') {
								return !i.orgType;
							} else if (filter === 'non-profit') {
								return i.orgType;
							} else if (filter === 'favourite') {
								return i.favourite;
							} else if (filter === 'created') {
								return i.userID;
							}
						})
						.map((contact, i) => (
							// Show each contact
							<Contact
								contact={contact}
								key={i}
							/>
						))}
				</div>
			</div>
		);
	}
}
