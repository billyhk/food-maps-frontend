import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { UserContext } from './UserContext';

// Components for Router path
import Home from './Components/Home/Home';
import LogIn from './Components/Auth/LogIn';

import './Styles/index.css';
import './Styles/map.css'

function App() {
	const [user, setUser] = useState(null);

	const value = useMemo(() => ({ user, setUser }), [user, setUser]);

	return (
		<Router>
			<UserContext.Provider value={value}>
				<Route path='/' exact component={Home} />
				<Route path='/login' component={LogIn} />
			</UserContext.Provider>
		</Router>
	);
}

export default App;
