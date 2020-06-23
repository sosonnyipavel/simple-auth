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

    handleChange = () => {
        this.setState({ buttonSubmit: false });
    }

    onSubmit = (formValues) => {
        this.setState({ buttonSubmit: true });
        this.props.signIn(formValues);
    }

    badResponse() {
        if (this.props.errorMessage){
            return (
                <div className="ui inverted relaxed divided list">
                    <div className="item">
                        <div className="content">
                            <h4 className="ui red inverted header">{this.props.errorMessage}</h4>
                        </div>
                    </div>
                </div>
            );
        }
    }
    
    
    render() {
        return (
            <div className="ui inverted segment">
                <Form onChange={this.handleChange} onSubmit={this.onSubmit} buttonSubmit={this.state.buttonSubmit} />
                {this.badResponse()}
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        errorMessage: state.auth.errorMessage,
        isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProps, {signIn})(Auth);