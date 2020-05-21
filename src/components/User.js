import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';
import history from '../history';

class User extends React.Component {
    componentDidMount() {
        if(this.props.isSignedIn) {
            this.props.getUser(localStorage.getItem('token'));
        } else {
            history.push('/signin');
        }
    }
    signOutClick = () => {
        this.props.signOut(localStorage.getItem('token'));
    }
    render() {
        return (
            <div>
                <div>{console.log(this.props.user) }</div>
                <button onClick={this.signOutClick}> Delete </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        user: state.user
    };
}


export default connect(mapStateToProps, { getUser, signOut })(User);