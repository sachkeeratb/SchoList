// Navigation Bar
export default function NavBar() {
	return (
		<header className='bg-indigo-900'>
			<nav
				className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
				aria-label='Global'
			>
				<div className='lg:flex lg:flex-1'>
					{/* The name of the website */}
					<a className='lg:flex lg:flex-1 lg:justify-start text-md font-bold leading-6 text-white'>
						SchoList
					</a>
				</div>

				<div className='flex space-x-20 lg:flex lg:flex-1 lg:justify-center'>
					{/* Redirect the user to the home page */}
					<a
						href='/'
						className='text-sm font-semibold leading-6 text-white'
					>
						Home
					</a>

					{/* Redirect the user to the about us page */}
					<a
						href='/aboutus'
						className='text-sm font-semibold leading-6 text-white'
					>
						About Us
					</a>

					{/* Redirect the user to the help page */}
					<a
						href='/help'
						className='text-sm font-semibold leading-6 text-white'
					>
						Help
					</a>
				</div>

				<div className='lg:flex lg:flex-1 lg:justify-end'>
					{/* Redirect the user to the settings page */}
					<a
						href='/settings'
						className='text-sm font-semibold leading-6 text-white'
					>
						⚙️
					</a>
				</div>
			</nav>
		</header>
	);
}
