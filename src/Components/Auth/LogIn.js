import React, { useContext } from 'react';
import { UserContext } from '../../UserContext';
import { loginSampleData } from './LoginSampleData';

export default function Login() {
	const { user, setUser } = useContext(UserContext);

	return (
		<div>
			<h2>Home</h2>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			{user ? (
				<button
					onClick={() => {
						// call logout
						setUser(null);
					}}>
					logout
				</button>
			) : (
				<button
					onClick={async () => {
						const user = await loginSampleData();
						setUser(user);
					}}>
					login
				</button>
			)}
		</div>
	);
}
