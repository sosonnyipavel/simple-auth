import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';

class User extends React.Component {

    componentDidMount() {
        console.log(this.props.userToken);
        this.props.getUser(this.props.userToken);
    }

    render() {
        return (
        <div>{this.props.userToken }</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userToken: state.auth.userToken,
        user: state.user
    };
}

export default connect(mapStateToProps, { getUser, signOut })(User);