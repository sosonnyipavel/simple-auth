import React from 'react';
import { Field, reduxForm } from 'redux-form';

class Form extends React.Component{
    constructor(props) {
        super(props)
        this.state = { buttonSubmit: false }
    }

    renderError({ touched, error  }) {
        if (touched && error) {
            return (
                {touched} && {error} && <span>{error}</span>
            );
        }
    }

    renderInput = ({ input, label, type, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error': ''}`;
        return (
            <div className={className}>
                <label> {label} </label>
                <input {...input} type={type} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        this.setState({ buttonSubmit: true });
    }


    render() {
        
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui inverted form">
                <Field name="email" type="email" component={this.renderInput} label="Enter Login" />
                <Field name="password" type="password" component={this.renderInput} label="Enter Password" />
                    <button type="submit" disabled={this.state.buttonSubmit} className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors ={};
    if(!formValues.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)) {
        errors.email = 'Invalid email address'
    }

    if(!formValues.password) {
        errors.password = 'Required';
    } 
    return errors;
};

export default reduxForm({
    validate,
    form: 'userForm'
}) (Form);