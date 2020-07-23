import React from 'react';
import { connect } from 'react-redux';
import { signOut, getUser, editUser } from '../actions';
import ModalEdit from './ModalEdit';
import history from '../history';

class User extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { 
            buttonLogOut: false, 
            modalClassName: 'ui dimmer modals visible',
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPhone: ''
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.props.getUser(token);
        } else {
            history.push('/signin');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.location.key !== prevProps.location.key) {
            if (this.props.errorMessage){
                this.setState({ buttonLogOut: false });
            }
        }
        if (this.state.modalClassName !== prevState.modalClassName){
            this.setState({
                userFirstName: this.props.userData.userFirstName,
                userLastName: this.props.userData.userLastName,
                userEmail: this.props.userData.userEmail,
                userPhone: this.props.userData.userPhone
            });
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
        this.setState({ modalClassName: 'ui dimmer modals visible active'});
    }

    
    renderInput() {
        return (
            <div className="ui form">
            <div className="three fields">
                <div className="field">
                <label>First name</label>
                <input type="text" name="first-name" value={this.state.userFirstName} onChange={this.handleChange}/>
                </div>
                <div className="field">
                <label>Last name</label>
                <input type="text" name="last-name" value={this.state.userLastName} onChange={this.handleChange}/>
                </div>
                <div className="field">
                <label>Email</label>
                <input type="email" name="email" value={this.state.userEmail} onChange={this.handleChange}/>
                </div>
                <div className="field">
                <label>Phone</label>
                <input type="text" name="phone" value={this.state.userPhone} onChange={this.handleChange}/>
                </div>
            </div>
            </div>
        );
    }

    renderActions(){

        return (
            <React.Fragment>
                    <p>Submit changes?</p>
                    <button onClick={this.handleSubmitNo}  className="ui red basic cancel inverted button">
                    <i className="remove icon"></i>
                    No
                    </button>
                    <button onClick={this.handleSubmitYes} className="ui green ok inverted button">
                    <i className="checkmark icon"></i>
                    Yes
                    </button>
            </React.Fragment>
        );
    }

    handleChange = (event) => {
        switch(event.target.name){
            case 'first-name': return this.setState({userFirstName: event.target.value });
            case 'last-name': return this.setState({userLastName: event.target.value });
            case 'email': return this.setState({userEmail: event.target.value });
            case 'phone': return this.setState({userPhone: event.target.value });
            default: return this.state;
        }
    }

    handleSubmitYes = () => {
        if(this.state.userFirstName !== this.props.userData.userFirstName || 
            this.state.userLastName !== this.props.userData.userLastName ||
            this.state.userEmail !== this.props.userData.userEmail ||
            this.state.userPhone !== this.props.userData.userPhone) 
            {
                const token = localStorage.getItem('token');
                this.props.editUser(token, this.state);
            }
        this.setState({ modalClassName: 'ui dimmer modals visible'});
    }

    handleSubmitNo = () => {
        this.setState({ modalClassName: 'ui dimmer modals visible'});
    }
    
    render() {
        return (
            <div className="ui inverted segment">
                <div> {this.userTable()} </div>
                <ModalEdit
                    input={this.renderInput()}
                    actions={this.renderActions()}
                    className={this.state.modalClassName}
                
                />
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


export default connect(mapStateToProps, { getUser, signOut, editUser })(User);