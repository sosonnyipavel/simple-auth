import React from 'react';
import Form from './Form';
import {connect} from 'react-redux';
import { signIn } from '../actions';

class Auth extends React.Component{

    onSubmit = (formValues) => {
        this.props.signIn(formValues);
    }
    render() {
        return (
            <div className="ui inverted segment">
                <Form onSubmit={this.onSubmit}  />
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        auth: state.auth
    };
}

export default connect(mapStateToProps, {signIn})(Auth);