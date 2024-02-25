// The default css
import './App.css';

// Import the pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import About from './pages/About.jsx';
import Help from './pages/Help.jsx';
import Settings from './pages/Settings.jsx';
import Contacts from './pages/Contacts.jsx';
import AddContact from './pages/AddContact.jsx'

// Import the navigation bar
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx'

// To provide context for the user
import { UserContextProvider } from '../context/UserContext.jsx';

// To navigate users to pages
import { Routes, Route } from 'react-router-dom';

// To set up the API
import axios from 'axios';

// To set up the user notifications
import { Toaster } from 'react-hot-toast';

// Configure the API requests
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

// The app
export default function App() {
	return (
		<>
			<UserContextProvider>
				<NavBar />
				{/* Configure the position and time of the notifications (bottom right, 3 seconds) */}
				<Toaster
					position='bottom right'
					toastOptions={{ duration: 3000 }}
				/>
				<Routes>
					{/* Set up the routes for each page */}
					<Route
						path='/'
						element={<Home />}
					/>

					<Route
						path='/login'
						element={<Login />}
					/>

					<Route
						path='/signup'
						element={<Signup />}
					/>

					<Route
						path='/aboutus'
						element={<About />}
					/>

					<Route
						path='/contacts'
						element={<Contacts />}
					/>

					<Route 
							path='/addcontact'
							element={<AddContact />}
					/>

					<Route
						path='/help'
						element={<Help />}
					/>
          
					<Route
						path='/settings'
						element={<Settings />}
					/>
				</Routes>
				<Footer />
			</UserContextProvider>
		</>
	);
}