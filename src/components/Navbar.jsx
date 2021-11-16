import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import Searchbar from './Searchbar';

import './Navbar.css';

function Navbar(props) {
	const { color } = useTheme();
	return (
		<div className="navbar" style={{ background: color }}>
			<nav>
				<Link to="/" className="brand">
					<h1>Cooking Recipes</h1>
				</Link>
				<Searchbar />
				<Link to="/create">Create Recipe</Link>
			</nav>
		</div>
	);
}

export default Navbar;
