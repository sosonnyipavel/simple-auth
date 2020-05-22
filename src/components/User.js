import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';
import history from '../history';

class User extends React.Component {
    componentDidMount() {
        if(this.props.isSignedIn){
            this.props.getUser(this.props.userToken);
        } else {
            history.push('/signin')
        }
    }


    userTable = () => {
        return (
            <table className="ui inverted table">
            <thead>
                <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>{this.props.userData.userFirstName}</td>
                <td>{this.props.userData.userLastName}</td>
                <td>{this.props.userData.userEmail}</td>
                <td>{this.props.userData.userPhone}</td>
                </tr>
            </tbody>
            </table>
        );
    }

    signOutClick = () => {
        this.props.signOut(this.props.userToken);
    }
    render() {
        return (
            <div>
                <div> {this.userTable()} </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userToken: state.auth.userToken,
        userData: state.user
    };
}


export default connect(mapStateToProps, { getUser, signOut })(User);