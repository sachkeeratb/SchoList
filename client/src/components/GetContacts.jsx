// Make API requests
import axios from 'axios';

// Get all the contacts
export const GetAllContacts = async () => {
	try {
		// Make the API request and return the data
		const res = await axios.get('/contact/get');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

// Create a contact
export const CreateContact = async (contact) => {
	if (contact.image) {
		// To get the image and store it locally to show it
		const form = new FormData();
		const imageName = contact.image.name;
		form.append('name', imageName);
		form.append('file', contact.image);
		contact.image = imageName;

		try {
			// Send the image to the backend
			await axios.post('/contact/upload/', form);
		} catch (error) {
			console.log(error);
		}

		try {
			// Create the contact
			const res = await axios.post('/contact/create/', contact);
			return res.contact;
		} catch (error) {
			console.log(error);
		}
	}
};

// Deleting the contact
export const DeleteContact = async (id) => {
	try {
		// Make an API request to delete the contact with the given ID
		await axios.delete(`/contact/delete/${id}`);
	} catch (error) {
		throw Error(error);
	}
};

/*
// To update the contact
export const UpdateContact = async (contact) => {
	try {
		await axios.put(`/contact/update/${contact._id}`, contact);
	} catch (error) {
		throw Error(error);
	}
};
*/
