//Shows users their form inputs for review before sending
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';

//formValues is made available because of mapStateToProps at the bottom
const SurveyFormReview = ({ onCancel, formValues }) => {
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
			<button className="yellow darken-3 btn-flat" onClick={onCancel}>
				Back
			</button>
		</div>
	);
};

//because we are passing mapStateToProps into connect (and including formValues) we have access to the those values in surveyFormReview component.
function mapStateToProps(state) {
	return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps)(SurveyFormReview);
