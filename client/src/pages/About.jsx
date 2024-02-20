// The About Page
export default function About() {
	return (
		<div className='overflow-hidden max-h-fit'>
			<div className='flex text-left min-h-half flex-1 flex-col justify-centre px-6 lg:px-8'>
				<div className='sm:mx-0 sm:w-half sm:max-w-sm'>
					{/* Title: Where */}
					<h2 className='mt-5 text-left text-5xl font-bold leading-10 tracking-tight text-indigo-900'>
						Where
					</h2>
				</div>
				{/* Shows the information of where we are localted (my school's address) */}
				<div className='mt-5 mb-10 sm:mx-2 sm:w-half sm:max-w-sm'>
					We are located at 415 Great Lakes Dr, Brampton, ON L6R 2Z4. <br />
					You can contact the creator of this website at
					sachkeeratbrar@gmail.com or 123-456-7890.
				</div>
			</div>
			<div></div>
			<div className='flex text-left min-h-half flex-1 flex-col justify-centre px-6 lg:px-8'>
				<div className='sm:mx-0 sm:w-half sm:max-w-sm'>
					{/* Title: Why (this was created) */}
					<h2 className='mt-5 text-left text-5xl font-bold leading-10 tracking-tight text-indigo-900'>
						Why
					</h2>
				</div>
			</div>
			<div className='flex text-left max-h-half flex-1 flex-col justify-center px-6 lg:px-8'>
				{/* Tells the user why this site was made */}
				<div className='mt-5 sm:mx-2 sm:w-half sm:max-w-sm'>
					Sachkeerat Brar made SchoList in order for any school&apos;s or
					organiation&apos;s Career and Technical Education Department to
					collect and store information about business and community partners.
					We provide a variety of important information and allow the user to
					add, delete, favourite, and more!
				</div>
			</div>

			{/* Google Maps showing my school's address */}
			<div className='flex translate-x-1/2 -translate-y-full justify-right rounded h-1/2'>
				<iframe
					src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2882.6206477889896!2d-79.7705375!3d43.7392069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b1644548fe915%3A0xc16bfb2aade24726!2sHarold%20M.%20Brathwaite%20Secondary%20School!5e0!3m2!1sen!2sca!4v1708283573854!5m2!1sen!2sca'
					width='600'
					height='400'
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				/>
			</div>
		</div>
	);
}
