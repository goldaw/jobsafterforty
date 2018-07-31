import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormErrors } from './FormErrors';
import { database } from './firebaseApp';
import { auth } from './firebaseApp';
import { submitJobField } from './actions/jobfields';
import store from './store/index.js';
import { connect } from 'react-redux';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  open: false,
  name: '',
  formErrors: {},
  error: null,
};
class DialogAddJobField extends React.Component {
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
    store.dispatch(submitJobField({
      name: this.state.name,
    }));
    this.handleClose();
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 0;
        fieldValidationErrors.position = nameValid ? '' : 'חובה למלא שם תחום';
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      nameValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid,
    });
  }
  render() {
    const {
      open,
      name,
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
          <RaisedButton style={{ margin: 5 }} label="הוספת תחום" onTouchTap={this.handleOpen} />
          <Dialog
            title="הוספת תחום"
            actions={actions}
            modal={false}
            open={this.state.open}
            actionsContainerStyle={{ textAlign: 'left' }}
            style={{ direction: 'rtl', textAlign: 'right' }}
            onRequestClose={this.handleClose}
          >
            <label>{(this.props.feedback.length) ? JSON.stringify(this.props.feedback) : ''}</label><br />
            <label htmlFor="name"><font className="reqLabel">*</font>שם תחום</label><br />
            <TextField hintText="נא למלא שדה זה" id="name" name="name" defaultValue={this.state.name} onChange={(event) => { this.handleFieldChange('name', event.target.value); }} /><br />
            <FormErrors formErrors={this.state.formErrors} />
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ feedback: state.feedback });

const mapDispatchToProps = {
  submitJobField,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddJobField);
