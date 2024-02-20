// The components to create the user and navigate the user
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

// The Contacts Page
// This is the actual purpose of this website
export default function Contacts() {
	// To navigate the user
	const navigate = useNavigate();

	// To get the user and their profile
	const { user } = useContext(UserContext);

	if (!user) {
		// If there is no user, navigate them to the login page
		return navigate('/login');
	} else {
		return (
			<>
				{/* TODO: Actually add what the website is supposed to do */}
				<h1>Contacts Page</h1>
				<h1>Welcome, {user.name}.</h1>
			</>
		);
	}
}
