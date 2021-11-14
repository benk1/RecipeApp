import React, { useState } from 'react';
import './Create.css';

function Create(props) {
	const [title, setTitle] = useState('');
	const [method, setMethod] = useState('');
	const [cookingTime, setCookingTime] = useState('');
	const [newIngredients, setNewIngredients] = useState('');
	const [ingredients, setIngredients] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(title, method, cookingTime);
	};

	const handleAdd = (e) => {
		e.preventDefault();
		const ing = newIngredients.trim();

		if (ing && !ingredients.includes(ing)) {
			setIngredients((prevIngredients) => [...prevIngredients, ing]);
		}
	};

	return (
		<div className="create">
			<h2 className="page-title">Add a New Recipe</h2>

			<form onSubmit={handleSubmit}>
				<label>
					<span>Recipe title:</span>
					<input
						type="text"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						required
					/>
				</label>

				<label>
					<span>Recipe ingredients:</span>
					<div className="ingredients">
						<input
							type="text"
							onChange={(e) => setNewIngredients(e.target.value)}
							value={newIngredients}
						/>
						<button onClick={handleAdd} className="btn">
							Add
						</button>
					</div>
				</label>

				<label>
					<span>Recipe method:</span>
					<textarea
						type="text"
						onChange={(e) => setMethod(e.target.value)}
						value={method}
						required
					/>
				</label>

				<label>
					<span>Cooking time (in minutes):</span>
					<input
						type="number"
						onChange={(e) => setCookingTime(e.target.value)}
						value={cookingTime}
						required
					/>
				</label>
				<button className="btn">Submit</button>
			</form>
		</div>
	);
}

export default Create;
