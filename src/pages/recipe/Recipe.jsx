import { useParams, useHistory } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';

import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';

function Recipe(props) {
	const { id } = useParams();
	const history = useHistory();
	const url = 'http://localhost:5000/recipes/' + id;
	const { error, isPending, data: recipe } = useFetch(url);
	const { mode } = useTheme();

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
