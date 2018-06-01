import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//dummy components
import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
	// using 'DidMount' instead of 'WillMount' because 'Did' is viewed as the preferred action for initial AJAX requests. And the difference in speed/timing between the two has virtually no difference
	componentDidMount() {
		//the access to props.fetchUser() is provided by the exported 'connect' function at the bottom. It is housed in 'actions'
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
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
	}
}

//the 'actions' are assigned to the App component as props
export default connect(null, actions)(App);
