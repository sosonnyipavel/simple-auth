import React from 'react';
import Form from './Form';
import MaterialSnackbar from './MaterialSnackbar';
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

    componentDidUpdate(prevProps) {
        if(this.props.location.key !== prevProps.location.key) {
            if (this.props.message){
                this.setState({ buttonSubmit: false });
            }
        }
    }


    onSubmit = (formValues) => {
        this.setState({ buttonSubmit: true });
        this.props.signIn(formValues);
    }
    
    render() {
        return (

            <div className="ui inverted segment">
                <Form onSubmit={this.onSubmit} buttonSubmit={this.state.buttonSubmit} />
                <MaterialSnackbar message={this.props.message} />
            </div>
        );
    }
    
}

const mapStateToProps = (state) => {
    return { 
        message: state.auth.errorMessage
    };
}

export default connect(mapStateToProps, {signIn})(Auth);