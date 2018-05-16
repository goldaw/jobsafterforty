import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormErrors } from './FormErrors';
import { database } from './firebaseApp';
import { auth } from './firebaseApp';

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
export default class DialogRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    auth.createUserWithEmailAndPassword(email, userpwd)
      .then((authUser) => {
        authUser.updateProfile({ displayName: username });
        auth.signOut().then(() => {
          auth.signInWithEmailAndPassword(email, userpwd);
        });
        this.handleClose();
      })
      .catch((error) => {
        console.log(error);
        this.setState(byPropKey('error', error));
      });
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let password2Valid = this.state.password2Valid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' כתובת אימייל לא חוקית';
        break;
      case 'userpwd':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' סיסמה קצרה מדי';
        break;
      case 'userpwd2':
        password2Valid = value === this.state.userpwd;
        fieldValidationErrors.password2 = password2Valid ? '' : 'הסיסמאות שהזנת לא זהות';
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      password2Valid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.password2Valid });
  }
  render() {
    const {
      open,
      username,
      email,
      userpwd,
      userpwd2,
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
          <RaisedButton style={{ margin: 5 }} label="הרשמה" onTouchTap={this.handleOpen} />
          <Dialog
          title="הרשמה"
          actions={actions}
          modal={false}
          open={this.state.open}
          actionsContainerStyle={{ textAlign: 'left' }}
          style={{ direction: 'rtl', textAlign: 'right' }}
          onRequestClose={this.handleClose}
        >
          <label htmlFor="username"><font className="reqLabel">*</font>שם משתמש</label><br />
          <TextField hintText="נא למלא שדה זה" id="username" name="username" defaultValue={this.state.username} onChange={(event) => { this.handleFieldChange('username', event.target.value); }} /><br />
          <label htmlFor="email"><font className="reqLabel">*</font>כתובת אימייל</label><br />
          <TextField hintText="נא למלא שדה זה" id="email" name="email" defaultValue={this.state.email} onChange={(event) => { this.handleFieldChange('email', event.target.value); }} /><br />
          <label htmlFor="userpwd"><font className="reqLabel">*</font>סיסמה</label><br />
          <TextField hintText="נא למלא שדה זה" id="userpwd" name="userpwd" type="password" defaultValue={this.state.userpwd} onChange={(event) => { this.handleFieldChange('userpwd', event.target.value); }} /><br />
          <label htmlFor="userpwd"><font className="reqLabel">*</font>וידוא סיסמה</label><br />
          <TextField hintText="נא למלא שדה זה" id="userpwd2" name="userpwd2" type="password" defaultValue={this.state.userpwd2} onChange={(event) => { this.handleFieldChange('userpwd2', event.target.value); }} /><br />
          <FormErrors formErrors={this.state.formErrors} />
        </Dialog>
        </div>
      </div>
    );
  }
}
