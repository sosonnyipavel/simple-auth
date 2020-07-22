import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { editUser } from '../actions'

class ModalEdit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: '',
            userLastName: '',
            userEmail: '',
            userPhone: '',
            className: 'ui dimmer modals visible'
        };
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            this.setState({
                userFirstName: this.props.userData.userFirstName,
                userLastName: this.props.userData.userLastName,
                userEmail: this.props.userData.userEmail,
                userPhone: this.props.userData.userPhone,
                className: this.props.onClassName
            });
        }
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

    handleSubmit = () => {
        if(this.state.userFirstName !== this.props.userData.userFirstName || 
            this.state.userLastName !== this.props.userData.userLastName ||
            this.state.userEmail !== this.props.userData.userEmail ||
            this.state.userPhone !== this.props.userData.userPhone) 
            {
                const token = localStorage.getItem('token');
                this.props.editUser(token, this.state);
            }
        this.setState({ className: 'ui dimmer modals visible'});
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
    
    render() {
        return ReactDOM.createPortal(
            <div className={this.state.className} >
                <div className="ui small basic modal visible active" >
                    <div className="content">
                        {this.renderInput()}
                    </div>
                <div className="actions">
                    <p>Submit changes?</p>
                    <button onClick={this.handleSubmit}  className="ui red basic cancel inverted button">
                    <i className="remove icon"></i>
                    No
                    </button>
                    <button onClick={this.handleSubmit} className="ui green ok inverted button">
                    <i className="checkmark icon"></i>
                    Yes
                    </button>
                </div>
                </div>
            </div>, document.querySelector('#modal')       
        );
    }
};

const mapStateToProps = (state) => {
    return { 
        userData: state.user
    };
}

export default connect(mapStateToProps, {editUser})(ModalEdit);