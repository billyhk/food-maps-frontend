import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../UserContext';
import { Marker } from '@react-google-maps/api';

import Map from '../../Components/Map/Map';
import Logo from '../../Components/Map/Logo';
import LogInOut from './LogInOut';

export default function Home() {
	const { user } = useContext(UserContext);
	const [places, setPlaces] = useState([]);
	const [error, setError] = useState(false);
	const [selected, setSelected] = useState(null);

	// let center;
	// navigator.geolocation.getCurrentPosition((position) => {
	// 	center = {
	// 		lat: position.coords.latitude,
	// 		lng: position.coords.longitude,
	// 	};
	// });

	// on the business detail page, the center will be the coordinates of places[0] (i.e {lat: places[0].location[0], lng: places[0].location[1]})
	const center = {
		lat: 10,
		lng: 11,
	};

	const onMapClick = useCallback((e) => {
		console.log(e);
		// setMarkers((current) => [
		// 	...current,
		// 	{
		// 		lat: e.latLng.lat(),
		// 		lng: e.latLng.lng(),
		// 		time: new Date(),
		// 	},
		// ]);
		// });
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		fetch(`http://localhost:4000/api/places`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setPlaces(data);
			})
			.catch(() => {
				setError(true);
			}); // eslint-disable-next-line
	}, []);

	const markersDataFromBackend = places.map((place) => (
		<Marker
			key={place._id}
			position={{ lat: place.location[0], lng: place.location[1] }}
			onClick={() => {
				setSelected(place);
			}}
			icon={{
				url:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQNvMIigjkul1dRTPkP9Zxv_D6GvUZlYPT6hQ&usqp=CAU',
				origin: new window.google.maps.Point(0, 0),
				anchor: new window.google.maps.Point(15, 15),
				scaledSize: new window.google.maps.Size(50, 50),
			}}
		/>
	));

	return (
		<>
			<div className='map-controls'>
				<Logo />
				<LogInOut />
			</div>
			<Map
				places={markersDataFromBackend}
				center={center}
				setSelected={setSelected}
				selected={selected}
				onMapClick={onMapClick}
			/>
		</>
	);
}
