import React from 'react';

export default function Locate({ panTo }) {
	return (
		<button
			className='locate'
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					() => null
				);
			}}>
			<img
				src='https://lh3.googleusercontent.com/j40P2o40AM4-H0y20CzU-Qo4vllefct00WH9Be_OwfyHZl0DuyWqNn8joDKnFl8D03Y'
				alt='compass'
			/>
		</button>
	);
}
