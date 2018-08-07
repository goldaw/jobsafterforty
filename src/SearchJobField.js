import React from 'react';
//import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import searchItems from './searchItems';
import {chooseJobField} from './actions/jobfields';
import './search.css';
import store from './store/index.js';
import { connect } from 'react-redux';
import { listenToJobFields } from './actions/jobfields';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';

const theme = createMuiTheme({
    overrides: {
    MuiDialog:{
      color:'blue',
     },
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
          },        },
       
      },
    },
  });

  const styles = {
    root: {
      backgroundColor: 'red',
    },
    button:{color:'green'},
  };
const byPropKey=(propertyName,value)=>()=>(
    {
        [propertyName]:value,
    })
const INITIAL_STATE={
    open:false,
    //jobFields:searchItems.adminRoles,
    selectJobField:'',
    selectJobFieldName:'',
} ;   

class DialogCooseJobField extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleSelectJobFieldChange=this.handleSelectJobFieldChange.bind(this);
        this.makeJobField=this.makeJobField.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.handlecClean=this.handlecClean.bind(this);
    }
    componentDidMount() {
        store.dispatch(listenToJobFields());
    }
    handlecClean(){
        store.dispatch(chooseJobField({
            selectJobField:'',
            selectJobFieldName:'',
        })); 
    }
    handleOpen(){
        
        this.setState({open:true});
    }
    handleClose(){
        this.setState({open:false});
    }

    handleSelectJobFieldChange(name,e)
    {
 /* if(value=='בחר תחום')
    this.setState(byPropKey(name, 'allCategories'));// () => { this.validateField(name, value); }
 else*/ 
  //  this.setState(byPropKey(name, e.value),);// () => { this.validateField(name, value); }
    let jsonTofill=e.value;
    this.setState({
    itemsToFill:jsonTofill,
    selectJobField:e.id,
    selectJobFieldName:e.value,
    });
    this.handleClose();
    store.dispatch(chooseJobField({
        selectJobField:e.id,
        selectJobFieldName:e.value,
    }));
    
    }

    makeJobField(item){
        return <div> <input className='dialogJobFieldBtn' type='button' id={item.uid} onClick={(event)=>{this.handleSelectJobFieldChange('selectJobField',event.target)}} value={item.name}/></div>;
    }
handlesubmit(){
    this.handleClose();
    store.dispatch(chooseJobField({
        selectJobField:this.state.selectJobField,
        selectJobFieldName:this.state.selectJobFieldName,
    }));
}
    render(){

        const {
            open,
            name,
            selectJobField,
            selectJobFieldName,
        }=this.state;
     
        return(
             <div style={{ display:'inline-block' }}>
             <MuiThemeProvider theme={theme}>
               <Button 
              // buttonStyle={{borderRadius:50}}
              // style={{ margin: 15 ,borderRadius:50,height:94,width: 94}}
               onClick={this.handleOpen} >בחר תחום</Button>
                </MuiThemeProvider>
                <Dialog style={{direction:'rtl',textAlign:'rtl'}} onClose={this.handleClose} aria-labelledby="simple-dialog-title"
                 open={this.state.open}
                >

             {/*<DialogTitle style={{display:'inline-block'}} id="simple-dialog-title">בחר תחום</DialogTitle>*/}
             <div>
             <Button className="btnOk" onClick={this.handlecClean} 
              style={{float:'right', color: '#4da6ff',border: '#4da6ff solid 2px',margin:9}}>נקה בחירה</Button>

             <input type='button'  className='closeBtn' onClick={this.handleClose} 
               value='X'/>
              </div>
              <div className='wrapElem'>{this.props.jobFields.length ?this.props.jobFields.map(this.makeJobField):''}</div> 
               </Dialog>
             </div>
            
        )
    }
}

const mapStateToProps = state => ({ feedback: state.feedback ,
    jobFields: state.jobfields.data,});

const mapDispatchToProps = {
  chooseJobField,
};
export default connect(mapStateToProps,mapDispatchToProps)(DialogCooseJobField);

