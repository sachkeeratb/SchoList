// To redirect users to the GitHub repository if they click the designated button for it
import { Link } from 'react-router-dom';

// For rendering certain functions better
import { useEffect } from 'react';

// For the carousel
import Carousel from '../components/Carousel.jsx';

// The Home Page
export default function Home() {
	// The locations of each picture
	const pictures = [
		'src/assets/shihan_manav.png',
		'src/assets/me.png',
		'src/assets/pranav.png',
		'src/assets/nimay.png',
		'src/assets/parth.png',
		'src/assets/vansh.png',
	];

	// Load the pictures in
	useEffect(() => {
		pictures.forEach((picture) => {
			new Image().src = picture;
		});
	}, []);

	return (
		<div className='overflow-hidden max-h-screen'>
			<div className='w-1/2 flex text-left min-h-full flex-1 flex-col justify-left px-6 lg:px-8'>
				<div className='sm:mx-0 sm:w-full sm:max-w-sm'>
					{/* The title of the website, along with its slogan */}
					<h2 className='mt-5 text-left text-5xl font-bold leading-10 tracking-tight text-indigo-900'>
						SchoList:
						<br />
						Keeping Track
					</h2>
				</div>

				<div className='mt-10 sm:mx-2 sm:w-full sm:max-w-sm'>
					{/* The inspiration and purpose of this website */}
					<b>
						&quot;The way to get started is to quit talking and begin
						doing.&quot; - Walt Disney
					</b>
					<br />
					<b>SchoList</b> is how you quit talking, and begin doing.
					<br />
					<br />
					To collect and store information about business and community
					partners.
					<br />
					Pre-packaged with information on 25 different partners.
					<br />
					Details include the type of organization, resources available, direct
					contact, and more!
					<br />
					Everything from searching and filtering is included.
					<br />
				</div>

				<form>
					<div className='flex justify-left space-x-5'>
						<button
							type='submit'
							className='mt-10 flex w-auto justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							{/* A button to get started and sign up */}
							<a
								href='/signup'
								className='font-semibold leading-6 text-white hover:text-indigo-500'
							>
								Get Started!
							</a>
						</button>
						<button
							type='submit'
							className='mt-10 flex w-auto justify-center rounded-md bg-indigo-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							{/* A button to the GitHub repository */}
							<Link
								to='https://github.com/sachkeeratb/SchoList'
								className='font-semibold leading-6 text-white hover:text-indigo-500'
							>
								Github Repo
							</Link>
						</button>
					</div>
				</form>
			</div>
			<div></div>
			<div className='scale-75 h-screen flex items-right justify-center -translate-y-[30rem] translate-x-72'>
				{/* The carousel */}
				<Carousel images={pictures} />
			</div>
		</div>
	);
}
