//Shows users their form inputs for review before sending
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

//formValues is made available because of mapStateToProps at the bottom
const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
	const reviewFields = formFields.map(({ name, label }) => {
		return (
			<div key={name}>
				<label>{label}</label>
				<div>{formValues[name]}</div>
			</div>
		);
	});

	return (
		<div>
			<h5>Please Confirm Your Entries</h5>
			{reviewFields}
			<button
				className="yellow darken-3 white-text btn-flat"
				onClick={onCancel}>
				Back
			</button>
			<button
				// adding the arrow function to onClick prevents submitSurvey from immediately running when mounted. this is being added to the props by being included in the connect function below (actions)
				//this also passes the history object from 'withRouter' (declared in connect at bottom) to the submitSurvey action
				onClick={() => submitSurvey(formValues, history)}
				className="green btn-flat right white-text">
				Send Survey
				<i className="material-icons right">email</i>
			</button>
		</div>
	);
};

//because we are passing mapStateToProps into connect (and including formValues) we have access to the those values in surveyFormReview component.
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

//withRouter give the component access to the history object within React Router within the props object
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
