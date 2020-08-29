import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';

export default function LogInOut() {
	const { user, setUser } = useContext(UserContext);

	const handleLogOut = () => {
		setUser(null);
	};

	return user ? (
		<Link to='/' onClick={handleLogOut}>
			Logout
		</Link>
	) : (
		<Link to='/login'>Log In</Link>
	);
}