// To store and create the states of the messages and indexes
import { useState, useEffect } from 'react';

// For the carousel's animations
import { motion, AnimatePresence } from 'framer-motion';

// For the star icons
import { FaStar } from 'react-icons/fa';

// Create the carousel
const Carousel = ({ images }) => {
	// Store the messages in the carousel
	const [message] = useState([
		'"SchoList has helped our organization keep track of, and meet new, business partners in the area! Thank you so much!"',
		'"I am very happy that my creation of SchoList has helped many people in my community."',
		'"Not only has SchoList helped my organization greatly, but their features and help page is what hit the spot!"',
		'"SchoList helped take a lot off my plate!"',
		'"Sometimes its so hard to run my non-profit organization all by myself; SchoList comes in and saves the day!"',
		'"This website does it all! Nobody can beat SchoList."',
	]);

	// Store the authors of each message
	const [author] = useState([
		'- Manav and Shihan, famous entrepreneuers',
		' - Sachkeerat Brar, celebrity programmer',
		'- Pranav, from PT Inc.',
		'- Nimay, professional backend devloper, chef, and electrician',
		'- Parth, doctor in business, apiring millionaire',
		'- Vansh, famous historian',
	]);

	// Store the index of the current image displayed (to move through the carousel)
	const [index, setIndex] = useState(0);

	// To store the direction the carousel is moving in (for the animations)
	const [direction, setDirection] = useState(null);

	// Animation configuration
	const slideVariants = {
		hiddenRight: {
			x: '100%',
			opacity: 0,
		},
		hiddenLeft: {
			x: '-100%',
			opacity: 0,
		},
		visible: {
			x: '0',
			opacity: 1,
			transition: {
				duration: 1,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			transition: {
				duration: 0.5,
			},
		},
	};

	// The function to handle going to the next photo
	const handleNext = () => {
		setDirection('right');
		setIndex((prevIndex) =>
			prevIndex + 1 === images.length ? 0 : prevIndex + 1
		);
	};

	// To go through the pictures every 10 seconds
	useEffect(() => {
		setTimeout(handleNext, 10000);
	});

	return (
		<div className='carousel'>
			<div className='text-indigo-900 text-lg translate-x-[4rem] text-center justify-center items-center break-normal w-[40rem]'>
				{/* The messages and authors along with the 5-star reviews */}
				{message[index]}
				<br />
				<div className='flex mb-3 text-center justify-center items-center'>
					<FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
				</div>
				{author[index]}
			</div>

			{/* Process the pictures */}
			<AnimatePresence>
				<motion.img
					className='border-4 border-indigo-900 rounded 3xl'
					key={index}
					src={images[index]}
					initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
					animate='visible'
					exit='exit'
					variants={slideVariants}
				/>
			</AnimatePresence>

			{/* Map the pictures */}
			<div className='indicator'>
				{images.map((_, i) => (
					<motion.div
						key={i}
						initial='initial'
						animate={index === i ? 'animate' : ''}
						whileHover='hover'
					></motion.div>
				))}
			</div>
		</div>
	);
};

export default Carousel;
