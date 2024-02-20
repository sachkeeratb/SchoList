/* eslint-disable react/prop-types */

// To create the user and give them values
import { createContext, useState, useEffect } from 'react';

// To make API requests
import axios from 'axios';

// Create context for the user
export const UserContext = createContext({});

// Provide context for the user
export function UserContextProvider({ children }) {
	// Get the information from the API and put it in the user
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (!user) {
			axios.get('/profile').then(({ data }) => {
				setUser(data);
			});
		}
	}, []);

	// Return the children with the context provided
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}
