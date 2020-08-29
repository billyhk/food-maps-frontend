import React, { useRef, useCallback } from 'react';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
import mapStyles from '../../Styles/mapStyles';
import dateFormat from 'dateformat';

// import map sub-components
import RecenterBtn from './RecenterBtn';
import Search from './SearchLocation';

const libraries = ['places'];
const mapContainerStyle = {
	height: '100vh',
	width: '100vw',
};
const options = {
	styles: mapStyles,
	disableDefaultUI: true,
	zoomControl: true,
};

export default function Map(props) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});
	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);
	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading...';

	return (
		<>
			<div className='map-controls-location'>
				<Search panTo={panTo} />
				<RecenterBtn panTo={panTo} />
			</div>
			<GoogleMap
				id='map'
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={props.center}
				options={options}
				onClick={props.onMapClick}
				onLoad={onMapLoad}>
				{props.places}
				{props.selected ? (
					<InfoWindow
						position={{
							lat: props.selected.location[0],
							lng: props.selected.location[1],
						}}
						onCloseClick={() => {
							props.setSelected(null);
						}}>
						<div>
							<h1>Details!</h1>
							<ul>
								{props.selected.business && (
									<li>Business: {props.selected.business.title}</li>
								)}
								<li>Owner: {props.selected.owner.username}</li>
								<li>
									This location was added on:{' '}
									{dateFormat(props.selected.createdAt, 'dddd, mmmm dS, yyyy')}{' '}
								</li>
							</ul>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</>
	);
}
