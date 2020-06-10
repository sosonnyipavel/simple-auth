import React from 'react';
import Form from './Form';
import {connect} from 'react-redux';
import { signIn } from '../actions';
import history from '../history';

class Auth extends React.Component{

    constructor(props) {
        super(props);
        this.state = { buttonSubmit: false};
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            history.push('/');
        } 
    }

    onSubmit = (formValues) => {
        this.setState({ buttonSubmit: true });
        this.props.signIn(formValues).then(() => {
            this.setState({ buttonSubmit: false });
            localStorage.removeItem('wrongAuth');
        });
    }

    badResponse() {
        if (localStorage.getItem('wrongAuth')){
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
                <Form onSubmit={this.onSubmit} buttonSubmit={this.state.buttonSubmit} />
                {this.badResponse()}
            </div>
        );
    }
    
}


export default connect(null, {signIn})(Auth);