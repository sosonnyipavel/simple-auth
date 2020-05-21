import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';

class User extends React.Component {

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.getUser(token);
    }
    onSignOutClick = () => {
        localStorage.removeItem('token');
        this.props.signOut();
    }
    render() {
        return (
            <div>
                <div>{console.log(this.props.user) }</div>
                <button onClick={this.onSignOutClick}> Delete </button>
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