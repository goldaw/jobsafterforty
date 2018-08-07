import React from 'react';
import TextField from 'material-ui/TextField';
//import Dialog from 'material-ui/Dialog';
import Dialog from '@material-ui/core/Dialog';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { FormErrors } from './FormErrors';
import { database } from './firebaseApp';
import { submitSearch } from './actions/jobs';
import store from './store/index.js';
import { connect } from 'react-redux';
import './search.css';
import Autocomplete from 'react-autocomplete';
import subjectsAdmi from './subjects/administration.json';
import searchItems from './searchItems';
import 'react-select/dist/react-select.css';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import DialogCooseRegion from './SearchRegion';
import DialogSearchScopes from './SearchScopes';
import DialogCooseJobField from './SearchJobField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import { blue600 } from 'material-ui/styles/colors';
import {chooseJobField} from './actions/jobfields';


const theme = createMuiTheme({
  overrides: {
    // Name of the component ⚛️ / style sheet
   
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        backgroundColor:'#4da6ff',
        borderRadius: 50,
        border: 0,
        color: 'white',
        height: 94,
        width:94,
        margin:15,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(105, 137, 255, 0.45)',
        '&:hover': {
          backgroundColor: '#00f3e6',
          color:'black',
        },
        '&:disabled': {
          backgroundColor: '#dddddd',
          color:'white',
        },
      },
     
    },
  },
});


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });
const INITIAL_STATE = {
    open:false,
    selecedJobRegion:'',//מיקום
    selectedJobField:'',//תחום
    selectedcategory:'',
    selectRole:'',
    selectSearchCategory:'',
    valueSearchCategory:'',
    valueSearch:'',
    formErrors: {},
    formValid:'',
    error: null,
    itemsToFill:{},
    //itemsToFill:subjectsAdmi,
    selectedOption: '',
    adminRoles:searchItems.adminRoles,
    checked1:false,
    selectRolesArr:{},
    checkedArr:[],
    //showChooseJobfield:false,
  };

//@withStyles(styles)
class Search extends React.Component{

    constructor(props) {
     super(props);
    this.state={...INITIAL_STATE};
    this.handleFieldChange=this.handleFieldChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCheckChange=this.handleCheckChange.bind(this);
    this.handleSelectChange=this.handleSelectChange.bind(this);
    this.makeArrRoles=this.makeArrRoles.bind(this);
    this.handleClean=this.handleClean.bind(this);
    this.obj=[];
   // this.handleChange=this.handleChange.bind(this);
    //var itemsToFill='';
}

handleOpen() {
  this.setState({ open: true });
}
handleClean(){

}
handleOpenDialog()
{
  this.makeArrRoles();
  this.setState({ open: true });}
handleClose() {
  this.setState({ open: false });
}
 
handleFieldChange(name, value) {
  this.setState(byPropKey(name, value),);// () => { this.validateField(name, value); }
 
} 
handleCheckChange(name,target){
  const checkedArr = this.state.checkedArr
    let index
    if (target.checked) {
      checkedArr.push(target.value)
    } else {
      index = checkedArr.indexOf(target.value)
      checkedArr.splice(index, 1)
    }
    this.setState({ checkedArr: checkedArr })
}
makeArrRoles()
{
  console.log('obj');
  console.log(this.obj);
  var rolesArray = new Map()
  this.setState({selectRolesArr:rolesArray});
  console.log(rolesArray);
}
/*handleChange(name, value) {
  this.setState(byPropKey(name, value),);// () => { this.validateField(name, value); }
 
}*/

handleSelectChange(name,value)
{
    this.setState(byPropKey(name, value),);// () => { this.validateField(name, value); }
 let jsonTofill=value;
  this.setState({
    itemsToFill:jsonTofill,
  });
  if(this.state.open==true)
     this.handleClose;
}

validateField(fieldName, value) 
{
  const fieldValidationErrors = this.state.formErrors;
  let selectedJobFieldValid=this.state.selectedJobFieldValid;
  //let selectedcategoryValid=this.state.selectedcategoryValid;
  let selectSearchCategoryValid=this.state.selectSearchCategoryValid;
  let valueSearchValid=this.state.valueSearchValid;
  let formValid=this.state.formValid;
  //let positionValid = this.state.positionValid;
  
  
  switch (fieldName) {
   /* case 'selectedcategory':
    selectedcategoryValid = value.length >= 0;
    fieldValidationErrors.selectedcategory = selectedcategoryValid ? '' : 'חובה לבחור חיפוש לפי';
      break;*/
      case 'selectedJobField':
      selectedJobFieldValid=value!='בחר תחום';
      fieldValidationErrors.selectedJobField=selectedJobFieldValid?'':'חובה לבחור תחום';
      break;
    case 'selectSearchCategory':
    selectSearchCategoryValid = value.length > 0;
    fieldValidationErrors.selectSearchCategory = selectSearchCategoryValid ? '' : 'חובה לבחור חיפוש לפי';
      break;
    case 'valueSearch':
    valueSearchValid = value.match(/[^a-zA-Z0-9\-\/]/) ;//&& value.length >= 0 ;
      fieldValidationErrors.valueSearch = valueSearchValid ? '' : 'ערך לא חוקי';
      break;
    default:
      break;
  }
  this.setState({
    formErrors: fieldValidationErrors,
  //  selectedcategoryValid,
    selectSearchCategoryValid,
    valueSearchValid,
    selectedJobFieldValid,

     }, this.validateForm);
}
validateForm() {
  this.setState({//selectedcategoryValid &&
  /*  formValid: this.state.selectSearchCategoryValid&&
      this.state.valueSearchValid,*/
      formValid: this.state.selectedJobFieldValid,

  });
}

  handleSubmit() {
    //this.validateField('valueSearch',this.state.valueSearch)
   // this. validateField('selectSearchCategory',this.state.selectSearchCategory)
    this.validateField('selectedJobField',this.state.selectedJobField)
    if(!this.state.formValid)
  {
  /*  if(!this.state.valueSearch || !this.state.selectSearchCategory) { //this is null
      this.setState({ error: "Fill in both fields" });
    {*/
     // fieldValidationErrors.valueSearch = valueSearchValid ? '' : 'יש להכניס ערך לחיפוש';

    
    store.dispatch(submitSearch({
     checkedArr:this.state.checkedArr,
      selectJobField:this.props.selectJobField.selectJobField,
      selectJobFieldName:this.props.selectJobField.selectJobFieldName,
      checkedRegionsArrId:this.props.checkedRegionsArrId,
      checkedRegionsArrName:this.props.checkedRegionsArrName,
      checkedScopesArrId:this.props.checkedScopesArrId,
      checkedScopesArrName:this.props.checkedScopesArrName,
    valueSearch:this.state.valueSearch,
    }));
  }
  }
  
    render(){
        const {
            open,
            selectRole,
            selectJobField,
            selectJobFieldName,
            checkedScopesArrName,
            checkedScopesArrId,
            checkedRegionsArrName,
            checkedRegionsArrId,
            valueSearch,
            error,
          } = this.state;
          const actions = [
            <FlatButton
              label="אישור"
              primary
            //  disabled={!this.state.formValid}
              keyboardFocused
             // onTouchTap={this.handleSubmit}
              onClick={this.handleClose}
            />,
          ];

        return( // this.props.classes.root
       <div className='search-wrap'>
        <form onSubmit={e => {
          e.preventDefault()
          }}>
          <div>
          <input type='button' className="closeBtn" onClick={this.handleClose} 
               value='X'/>
          <input type='button' className="cleanBtn" onClick={this.handleClean} 
               value='נקה הגדרות חיפוש'/>

           </div>

          <div className='search-area'>

           <div className='inline search-type'>
           <div className='searchBtnWrap'>
          <Button   style={{borderRadius:17}} variant='contained' onClick={this.handleSubmit} >חפש</Button>
         
            {/*<TextField style={{direction:'rtl', textAlign:'right',width: '22%',
             margin:'0px 4px 0px 4px'}} id='textField' value={this.state.valueSearch} 
            placeholder='הכנס ערך לחיפוש'
            onChange={(event) => { this.handleFieldChange('valueSearch', event.target.value); }} />*/}
         </div>
          <div className='wrapSearchBtns'>
          <DialogSearchScopes className='searchBtns'/>
          <DialogCooseRegion className='searchBtns'/>
          <MuiThemeProvider  theme={theme}>
          <Button 
           disabled={this.props&&!this.props.selectJobField}
            onClick={this.handleOpenDialog}
          >בחר תפקיד</Button>
         {/* <RaisedButton
           //className={classes.root}
           // buttonStyle={{borderRadius:50}}// {margin: 15 ,borderRadius:50,height:94,width: 94,backgroundColor:'#0073e6'
            //style={this.props.classes.root}
            label="בחר תפקיד" onTouchTap={this.handleOpen}
            disabled={this.props&&!this.props.selectJobField}
         />*/}
          </MuiThemeProvider>
           <DialogCooseJobField className='searchBtns'/>
           </div>
           </div>
            
        <div className='searchRow2'>
           <div className='searchChoose'>
           <div className='wrapchoose'>
           {this.props.selectJobField?<div className='searchChoose-jobfield'>
             <label value={this.props.selectJobField.selectJobFieldName}>{this.props.selectJobField.selectJobFieldName}</label>
           </div>:null}
          </div>
          <div className='wrapchoose'>
            {this.state.checkedArr.length>0?this.state.checkedArr.map((item)=><div className='searchChoose-role'>
             <label value={this.state.selectRole}>{item}</label>
        </div>):null}
          </div>
          <div className='wrapchoose'>
         {this.props.checkedRegionsArrName?
          this.props.checkedRegionsArrName.map((item)=><div className='searchChoose-region'>
             <label value={item}>{item}</label>
         </div>):null}
         </div>
         <div className='wrapchoose'>
          {this.props.checkedScopesArrName?<div className='searchChoose-scopes'>
             <label value={this.props.checkedScopesArrName[0]}>{this.props.checkedScopesArrName[0]}</label>
          </div>:null}
        </div>
          </div>
          <FormErrors formErrors={this.state.formErrors} />            
           </div>

      <div className='divDialogSearch'>
      <Dialog style={{direction:'rtl',textAlign:'rtl'}} onClose={this.handleClose} aria-labelledby="simple-dialog-title"
      open={this.state.open}
     >
        <DialogTitle id="simple-dialog-title">בחר תפקיד</DialogTitle>
        {/*<Dialog id='dialogSearch'
            title="בחר תפקיד"
            actions={actions}
            modal={false}
            open={this.state.open}
            actionsContainerStyle={{ textAlign: 'left' }}
            style={{ direction: 'rtl', textAlign: 'right' }}
            onRequestClose={this.handleClose}
        >*/}
         <div>
            {
            this.props.selectJobField.selectJobFieldName&&this.state.adminRoles[this.props.selectJobField.selectJobFieldName]?this.state.adminRoles[this.props.selectJobField.selectJobFieldName]
            .map((item)=><div><FormControlLabel control={<Checkbox color='primary' checked={this.state.checkedArr.indexOf(item)>-1?true:false} className='dialogSearchBtn' id={item} value={item} 
            onClick={(event)=>{this.handleCheckChange(item,event.target)}}/>} label={item}/></div>):''
            }
         </div>
         <div>
           <Button style={{float:'left', color: '#4da6ff',border: '#4da6ff solid 2px',margin: 9}} 
           onClick={this.handleClose} >בחר הכל</Button>
         </div>
           </Dialog>
       
      </div>

         </div>
        </form>           

        </div>
        )
    }
}
const mapStateToProps = state =>({
selectJobField:state.jobfields.selectJobField,
selectJobFieldName:state.jobfields.selectJobFieldName,
checkedRegionsArrId:state.regions.checkedRegionsArrId&&state.regions.checkedRegionsArrId.checkedRegionsArrId?state.regions.checkedRegionsArrId.checkedRegionsArrId:'',
checkedRegionsArrName:state.regions.checkedRegionsArrId&&state.regions.checkedRegionsArrId.checkedRegionsArrName?state.regions.checkedRegionsArrId.checkedRegionsArrName:'',
checkedScopesArrId:state.scopes.checkedScopesArrId&&state.scopes.checkedScopesArrId.checkedScopesArrId?state.scopes.checkedScopesArrId.checkedScopesArrId:'',
checkedScopesArrName:state.scopes.checkedScopesArrId&&state.scopes.checkedScopesArrId.checkedScopesArrName?state.scopes.checkedScopesArrId.checkedScopesArrName:'',

//classes:state.object.isRequired
//auth: state.auth,

});
const mapDispatchToProps = {
    submitSearch,
  };

 /* Search.propTypes = {
    classes: PropTypes.object.isRequired
  };*/
 // export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Search));


  export default connect(mapStateToProps,mapDispatchToProps)(Search);
