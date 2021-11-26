import { useParams, useHistory } from 'react-router-dom';
// import { useFetch } from '../../hooks/useFetch';

import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';
import { useEffect, useState } from 'react';
import { projectFirestore } from '../../firebase/config';

function Recipe(props) {
	const [recipe, setRecipe] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(false);

	const { id } = useParams();
	const history = useHistory();
	// const url = 'http://localhost:5000/recipes/' + id;
	// const { error, isPending, data: recipe } = useFetch(url);
	const { mode } = useTheme();

	useEffect(() => {
		setIsPending(true);
		const unsub = projectFirestore
			.collection('recipes')
			.doc(id)

			.onSnapshot((doc) => {
				if (doc.exists) {
					setIsPending(false);
					setRecipe(doc.data());
				} else {
					setIsPending(false);
					setError('Could not find that recipe');
				}
			});
		return () => unsub();  //cleanUp function
	}, [id]);

	return (
		<div className={`recipe ${mode}`}>
			{error && <p className="error">{error}</p>}
			{isPending && <p className="loading">Loading...</p>}
			{recipe && (
				<>
					<h2 className="page-title">{recipe.title}</h2>
					<p>It takes {recipe.cookingTime} to cook.</p>
					<br />
					<p>Below are ingredients:</p>
					<ul>
						{recipe.ingredients.map((ing) => (
							<li key={ing.id}>{ing}</li>
						))}
					</ul>
					<p className="method">{recipe.method}</p>
					<button onClick={() => history.push('/')}>Go Back</button>
				</>
			)}
		</div>
	);
}

export default Recipe;
