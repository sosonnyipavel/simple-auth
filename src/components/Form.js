import React from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends React.Component{


    renderInput = ({ input, label}) => {
        return (
            <div className="field">
                <label> {label} </label>
                <input {...input} autoComplete="off" />
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui inverted form">
                <Field name="email" component={this.renderInput} label="Enter Login" />
                <Field name="password" component={this.renderInput} label="Enter Password" />
                    <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    if(!formValues.email) {
        errors.email = 'You must enter a title!';
    }

    if(!formValues.password) {
        errors.password = 'You must enter a description'
    }
    return errors;
};

export default reduxForm({
    form: 'userForm',
    validate
}) (Form);