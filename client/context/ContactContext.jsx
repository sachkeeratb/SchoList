// To give the contact context
import { createContext, useContext } from 'react';

// Create the contact's context
const ContactContext = createContext();

// Provide contect
const ContContext = ({ children }) => {
	const [update, setUpdate] = useState(null);
	return (
		<ContactContext.Provider value={{ update, setUpdate }}>
			{children}
		</ContactContext.Provider>
	);
};

// Export the context
export default ContContext;

// Export the contact's context
export const ContactContextExport = () => useContext(ContactContext);
