// SurveyNew displays SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
	//create react app provides this abbreviated form of declaring state (because of a babel plugin). traditionally you call the constructor(props) followed by super(props) and declare this.state = {...}
	state = { showFormReview: false };

	renderContent() {
		if (this.state.showFormReview) {
			return (
				<SurveyFormReview
					onCancel={() => this.setState({ showFormReview: false })}
				/>
			);
		}
		return (
			<SurveyForm
				onSurveySubmit={() => this.setState({ showFormReview: true })}
			/>
		);
	}

	render() {
		return <div>{this.renderContent()}</div>;
	}
}

//these 'settings' override the settings in the SurveyForm component and do not persist data if the cancel button is pressed
export default reduxForm({
	form: 'surveyForm'
})(SurveyNew);
