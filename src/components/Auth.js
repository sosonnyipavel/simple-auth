import React from 'react';
import Form from './Form';
import {connect} from 'react-redux';
import { signIn } from '../actions';

class Auth extends React.Component{

    onSubmit = (formValues) => {
        this.props.signIn(formValues);
    }
    
    badResponse = () => {
        if (localStorage.getItem('wrongAuth')) {
            localStorage.removeItem('wrongAuth');
            return (
                <div className="ui inverted relaxed divided list">
                    <div className="item">
                        <div className="content">
                        <h4 className="ui red inverted header">Login or password is wrong!</h4>
                        </div>
                    </div>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="ui inverted segment">
                <Form onSubmit={this.onSubmit}  />
                {this.badResponse()}
            </div>
        );
    }
    
}


export default connect(null, {signIn})(Auth);