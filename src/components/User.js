import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser, modalShow, errorCatch } from '../actions';
import ModalEdit from './ModalEdit';
import MaterialSnackbar from './MaterialSnackbar';
import history from '../history';

class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { buttonLogOut: false };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getUser(token);
        } else {
            history.push('/signin');
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.message !== prevProps.message) {
            this.setState({ buttonLogOut: false });
        }
    }


    userTable() {
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
        this.props.signOut(token).catch((error) => this.props.errorCatch(error));
    }

    buttonEdit = () => {
        this.props.modalShow(true);
    }
    
    render() {
        return (
            <div className="ui inverted segment">
                <div> {this.userTable()} </div>
                <ModalEdit />
                <button 
                    onClick={this.signOutClick}
                    type="button" 
                    disabled={this.state.buttonLogOut} 
                    style={{marginTop:50}} 
                    className="ui inverted teal basic button">
                    Log Out
                </button>
                <button onClick={ this.buttonEdit } className="ui inverted olive button" > Edit </button>
                <MaterialSnackbar message={this.props.message} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        userData: state.user,
        message: state.error.errorMessage
    };
}


export default connect(mapStateToProps, { getUser, signOut, modalShow, errorCatch })(User);