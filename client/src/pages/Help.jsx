// Import the accordion features
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from '@material-tailwind/react';

// To handle the accordion being opened and closed
import { useState } from 'react';

// Expand accordion icon
import { MdExpandMore } from 'react-icons/md';

// The Help Page
export default function Help() {
	// Store if and which accorion is open
	const [open, setOpen] = useState(0);

	// Handle the opening of an accordion
	const handleOpen = (value) => {
		setOpen(open === value ? 0 : value);
	};

	// To show the icon
	function Icon({ id, open }) {
		return (
			// Rotate upside if it is opened
			<MdExpandMore
				className={`${
					id === open ? 'rotate-180' : ''
				} h-5 w-5 transition-transform`}
			/>
		);
	}

	return (
		<>
			<h1 className='text-center text-4xl my-5 font-semibold text-indigo-900'>
				{/* Title */}
				Frequent Questions and Answers
			</h1>

			{/* Accordion 1 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 1}
				// Icon
				icon={
					<Icon
						id={1}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(1)}>
					How do I get started?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					Go to the home page. <br />
					Then, click on the "Get Started" button. <br />
					After that, fill out the form to create an account. <br />
					Finally, log in and enjoy using SchoList!
				</AccordionBody>
			</Accordion>

			{/* Accordion 2 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 2}
				// Icon
				icon={
					<Icon
						id={2}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(2)}>
					How do I log in?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					Go to the sign up page, and click the option to log in. <br />
					Then, fill out the form and enjoy using SchoList!
				</AccordionBody>
			</Accordion>

			{/* Accordion 3 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 3}
				// Icon
				icon={
					<Icon
						id={3}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(3)}>
					How do I add a contact?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					Once logged in, you are redirected to the contact page. <br />
					After that, you can click on the "Add Contact" list. <br />
					All you need to do from there is to fill out the form (properly) and
					submit!
				</AccordionBody>
			</Accordion>

			{/* Accordion 3 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 4}
				// Icon
				icon={
					<Icon
						id={4}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(4)}>
					How do I delete a contact?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					On contacts that you have added, there is a delete icon in the bottom
					right. <br />
					Once clicked, they are instantly gone!
				</AccordionBody>
			</Accordion>

			{/* Accordion 5 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 5}
				// Icon
				icon={
					<Icon
						id={5}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(5)}>
					How do I delete my account?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					First you go to the settings page. <br />
					Then, click on the delete button, and you are redirected to the home
					page!
				</AccordionBody>
			</Accordion>

			{/* Accordion 6 */}
			<Accordion
				className='text-left items-center justify-center w-7/12 ml-[15rem] text-indigo-900'
				open={open === 6}
				// Icon
				icon={
					<Icon
						id={6}
						open={open}
					/>
				}
			>
				{/* Question */}
				<AccordionHeader onClick={() => handleOpen(6)}>
					What if I have any other questions?
				</AccordionHeader>

				{/* Answer */}
				<AccordionBody className='ml-5'>
					You may contact the creator of this site at sachkeeratbrar@gmail.com.
				</AccordionBody>
			</Accordion>
		</>
	);
}
