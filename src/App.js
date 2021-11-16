import { Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';
import './App.css';
import { useTheme } from './hooks/useTheme';

function App() {
	const { mode } = useTheme();
	return (
		<div className={`App ${mode}`}>
			<Navbar />
			<ThemeSelector />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/create" component={Create} />
				<Route path="/search" component={Search} />
				<Route path="/recipes/:id" component={Recipe} />
			</Switch>
		</div>
	);
}

export default App;
