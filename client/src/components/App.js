import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//dummy components
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Header />
					{/* using 'exact' as a prop is the same as writing exact={true} */}
					<Route exact path="/" component={Landing} />
					<Route exact path="/surveys" component={Dashboard} />
					<Route path="/surveys/new" component={SurveyNew} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;