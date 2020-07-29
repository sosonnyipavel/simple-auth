import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser, modalShow } from '../actions';
import ModalEdit from './ModalEdit';
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
        if(this.props.location.key !== prevProps.location.key) {
            if (this.props.errorMessage){
                this.setState({ buttonLogOut: false });
            }
        }
    }


    userTable() {
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

    buttonEdit = () => {
        this.props.modalShow('ui dimmer modals visible active');
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


export default connect(mapStateToProps, { getUser, signOut, modalShow })(User);