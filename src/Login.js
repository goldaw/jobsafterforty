import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormErrors } from './FormErrors';
import { database } from './firebaseApp';
import { auth } from './firebaseApp';
import { signIn } from './actions/auth';
import C from './constants/auth.js';
import { connect } from 'react-redux';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  open: false,
  username: '',
  userpwd: '',
  userpwd2: '',
  email: '',
  formErrors: {},
  error: null,
};
class DialogLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.props = props;
  }

  handleFieldChange(name, value) {
    this.setState(byPropKey(name, value), () => { this.validateField(name, value); });
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleSubmit() {
    const {
      username,
      email,
      userpwd,
    } = this.state;
    this.props.signIn(email, userpwd);
    this.handleClose();
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    const password2Valid = this.state.password2Valid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' כתובת אימייל לא חוקית';
        break;
      case 'userpwd':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' סיסמה קצרה מדי';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }
  render() {
    const {
      open,
      email,
      userpwd,
      error,
    } = this.state;

    const actions = [
      <FlatButton
        label="אישור"
        primary
        disabled={!this.state.formValid}
        keyboardFocused
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <div>
          <RaisedButton style={{ margin: 5 }} label="כניסה" onTouchTap={this.handleOpen} />
          <Dialog
          title="כניסה"
          actions={actions}
          modal={false}
          open={this.state.open}
          actionsContainerStyle={{ textAlign: 'left' }}
          style={{ direction: 'rtl', textAlign: 'right' }}
          onRequestClose={this.handleClose}
        >
          <label htmlFor="email">כתובת אימייל</label><br />
          <TextField hintText="נא למלא שדה זה" id="email" name="email" defaultValue={this.state.email} onChange={(event) => { this.handleFieldChange('email', event.target.value); }} /><br />
          <label htmlFor="userpwd">סיסמה</label><br />
          <TextField hintText="נא למלא שדה זה" id="userpwd" name="userpwd" type="password" defaultValue={this.state.userpwd} onChange={(event) => { this.handleFieldChange('userpwd', event.target.value); }} /><br />
          <FormErrors formErrors={this.state.formErrors} />
        </Dialog>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogLogin);
