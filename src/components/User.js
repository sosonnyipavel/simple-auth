import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';
import history from '../history';

class User extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getUser(localStorage.getItem('token'));
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
        this.props.signOut(localStorage.getItem('token'));
    }

    render() {
        return (
            <div className="ui inverted segment">
                <div> {this.userTable()} </div>
                    <button onClick={this.signOutClick} style={{marginTop:50}} className="ui inverted teal basic button">Log Out</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        isSignedIn: state.auth.isSignedIn,
        userData: state.user
    };
}


export default connect(mapStateToProps, { getUser, signOut })(User);