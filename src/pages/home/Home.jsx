import React, { useEffect, useState } from 'react';
import RecipeList from '../../components/RecipeList';
// import { useFetch } from '../../hooks/useFetch';
import { projectFirestore } from '../../firebase/config';
import './Home.css';

function Home(props) {
	// const { data, isPending, error } = useFetch('http://localhost:5000/recipes');
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsPending(true);

		const unsubscribe = projectFirestore.collection('recipes').onSnapshot(
			(snapshot) => {
				if (snapshot.empty) {
					setError('No recipes to load');
					setIsPending(false);
				} else {
					let results = [];
					snapshot.docs.forEach((doc) => {
						results.push({ id: doc.id, ...doc.data() });
					});
					setData(results);
					setIsPending(false);
				}
			},
			(err) => {
				setError(err.message);
				setIsPending(false);
			}
		);
		return () => unsubscribe();
	}, []);

	return (
		<div className="home">
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{data && <RecipeList recipes={data} />}
		</div>
	);
}

export default Home;
