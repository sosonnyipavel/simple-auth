import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions';
import history from '../history';

class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { buttonLogOut: false }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getUser(token);
        } else {
            history.push('/signin');
        }
    }

    userTable = () => {
        if (this.props.errorMessage) {
            return <h4 className="ui red inverted header">{this.props.errorMessage}</h4>
        }
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
        this.setState({ buttonLogOut: true });
        const token = localStorage.getItem('token');
        this.props.signOut(token);
    }

    render() {
        return (
            <div className="ui inverted segment">
                <div> {this.userTable()} </div>
                <button 
                    onClick={this.signOutClick}
                    type="button" 
                    disabled={this.state.buttonLogOut} 
                    style={{marginTop:50}} 
                    className="ui inverted teal basic button">
                    Log Out
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        userData: state.user,
        errorMessage: state.auth.errorMessage
    };
}


export default connect(mapStateToProps, { getUser, signOut })(User);