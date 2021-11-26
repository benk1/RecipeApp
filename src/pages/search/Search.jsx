import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
// import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';
import './Search.css';
import { projectFirestore } from '../../firebase/config';

function Search(props) {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	const queryString = useLocation().search;
	const queryParams = new URLSearchParams(queryString);
	const query = queryParams.get('q');

	// const url = ' http://localhost:5000/recipes?q=' + query;
	// const { error, isPending, data } = useFetch(url);
	useEffect(() => {
		projectFirestore
			.collection('recipes')
			.orderBy('title')
			.startAt(query)
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					setError('No recipe to match!!');
					setIsPending(false);
				} else {
					setData(snapshot.data());
				}
			})
			.catch((err) => {
				setError(err.message);
				setIsPending(false);
			});
	}, []);
	return (
		<div>
			<h2 className="page-title">Recipe including '{query}'</h2>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{data && <RecipeList recipes={data} />}
		</div>
	);
}

export default Search;
