import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { FormErrors } from './FormErrors';
import { database } from './firebaseApp';
import { auth } from './firebaseApp';
import { submitJob } from './actions/jobs';
import store from './store/index.js';
import { connect } from 'react-redux';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});
const INITIAL_STATE = {
  open: false,
  position: '',
  company: '',
  description: '',
  location: '',
  contact_details: '',
  formErrors: {},
  error: null,
};
class DialogAddJob extends React.Component {
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
  
    store.dispatch(submitJob({
      position: this.state.position,
      company: this.state.company,
      description: this.state.description,
      location: this.state.location,
      contact_details: this.state.contact_details,
    }));
    this.handleClose();
  
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let positionValid = this.state.positionValid;
    let companyValid = this.state.companyValid;
    let descriptionValid = this.state.descriptionValid;
    let locationValid = this.state.locationValid;
    let contactDetailsValid = this.state.contactDetailsValid;

    switch (fieldName) {
      case 'position':
        positionValid = value.length >= 0;
        fieldValidationErrors.position = positionValid ? '' : 'חובה למלא כותרת משרה';
        break;
      case 'company':
        companyValid = value.length >= 0;
        fieldValidationErrors.company = companyValid ? '' : 'חובה למלא שם חברה';
        break;
      case 'description':
        descriptionValid = value.length >= 0;
        fieldValidationErrors.description = descriptionValid ? '' : 'חובה למלא תיאור משרה';
        break;
      case 'location':
        locationValid = value.length >= 0;
        fieldValidationErrors.location = locationValid ? '' : 'חובה למלא מיקום המשרה';
        break;
      case 'contact_details':
        contactDetailsValid = value.length >= 0;
        fieldValidationErrors.contact_details = contactDetailsValid ? '' : 'חובה למלא פרטי התקשרות';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      positionValid,
      companyValid,
      descriptionValid,
      locationValid,
      contactDetailsValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({
      formValid: this.state.positionValid &&
        this.state.companyValid &&
        this.state.descriptionValid &&
        this.state.locationValid &&
        this.state.contactDetailsValid,
    });
  }
  render() {
    const {
      open,
      position,
      company,
      description,
      location,
      contact_details,
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
          <RaisedButton style={{ margin: 5 }} label="הוספת משרה" onTouchTap={this.handleOpen} />
          <Dialog
            title="הוספת משרה"
            actions={actions}
            modal={false}
            open={this.state.open}
            actionsContainerStyle={{ textAlign: 'left' }}
            style={{ direction: 'rtl', textAlign: 'right' }}
            onRequestClose={this.handleClose}
          >
            <label>{(this.props.feedback.length) ? JSON.stringify(this.props.feedback) : ''}</label><br />
            <label htmlFor="position"><font className="reqLabel">*</font>משרה</label><br />
            <TextField hintText="נא למלא שדה זה" id="position" name="position" defaultValue={this.state.position} onChange={(event) => { this.handleFieldChange('position', event.target.value); }} /><br />
            <label htmlFor="company"><font className="reqLabel">*</font>חברה</label><br />
            <TextField hintText="נא למלא שדה זה" id="company" name="company" defaultValue={this.state.company} onChange={(event) => { this.handleFieldChange('company', event.target.value); }} /><br />
            <label htmlFor="description"><font className="reqLabel">*</font>תיאור</label><br />
            <TextField hintText="נא למלא שדה זה" id="description" name="description" defaultValue={this.state.description} onChange={(event) => { this.handleFieldChange('description', event.target.value); }} /><br />
            <label htmlFor="location"><font className="reqLabel">*</font>מיקום</label><br />
            <TextField hintText="נא למלא שדה זה" id="location" name="location" defaultValue={this.state.location} onChange={(event) => { this.handleFieldChange('location', event.target.value); }} /><br />
            <label htmlFor="contact_details"><font className="reqLabel">*</font>פרטי התקשרות</label><br />
            <TextField hintText="נא למלא שדה זה" id="contact_details" name="contact_details" defaultValue={this.state.contact_details} onChange={(event) => { this.handleFieldChange('contact_details', event.target.value); }} /><br />
            <FormErrors formErrors={this.state.formErrors} />
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({ feedback: state.feedback });

const mapDispatchToProps = {
  submitJob,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddJob);
