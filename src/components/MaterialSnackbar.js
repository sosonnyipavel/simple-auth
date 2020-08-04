import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


class MaterialSnackbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = { openSuccess: false, openError:false};
    }

  handleClickSuccess = () => {
    this.setState({ openSuccess: true });
  };
  handleClickError = () => {
    this.setState({ openError: true });
  };

  componentDidUpdate(prevProps, prevState){
      if(this.props.error !==prevProps.error){
        this.setState({ openError: true });
      }
  }

  handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSuccess: false });
    this.setState({ openError: false });
  };

  render() {
  return (
    <div>
      <Snackbar open={this.state.openSuccess} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Snackbar open={this.state.openError} autoHideDuration={6000} anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={this.handleClose}>
        <Alert onClose={this.handleClose}  severity="error">{this.props.error}</Alert>
      </Snackbar>
    </div>
  );
}

}

export default MaterialSnackbar;