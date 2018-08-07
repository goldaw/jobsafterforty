import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {chooseScopes} from './actions/scopes';
import { listenToScopes } from './actions/scopes';
import './search.css';
import store from './store/index.js';
import { connect } from 'react-redux';
import { stat } from 'fs';

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

const byPropkey=(propertyName,value)=>()=>(
    {
        [propertyName]:value,
    })
const INITIAL_STATE={
    open:false,
    checkedScopesArrId:[],
    checkedScopesArrName:[],
} ;   

class DialogSearchScopes extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.handleCheckChange=this.handleCheckChange.bind(this);
    }
    componentDidMount(){
        store.dispatch(listenToScopes());
    }
    handleOpen(){
        this.setState({open:true});
    }
    handleClose(){
        this.setState({open:false});
    }
    handleCheckChange(name,target){
        const checkedScopesArrId = this.state.checkedScopesArrId
        const checkedScopesArrName=this.state.checkedScopesArrName
          let indexName
          let indexId
          if (target.checked) {
            checkedScopesArrId.push(target.id)
            checkedScopesArrName.push(target.value)
          } else {
            indexName = checkedScopesArrId.indexOf(target.id)
            indexId=checkedScopesArrName.indexOf(target.value)
            checkedScopesArrId.splice(indexId, 1)
            checkedScopesArrName.splice(indexName,1)
          }
          this.setState({ 
            checkedScopesArrId: checkedScopesArrId,
            checkedScopesArrName:checkedScopesArrName,
         })
      }
  
handlesubmit(){
    this.handleClose();
    store.dispatch(chooseScopes({
        checkedScopesArrId:this.state.checkedScopesArrId,
        checkedScopesArrName:this.state.checkedScopesArrName,
    }));
}
    render(){

        const {
            open,
            name,
            //checkedScopesArrId,
            //checkedScopesArrName,
        }=this.state;
         const actions = [
     {/* <FlatButton
        label="אישור"
        primary
        //disabled={!this.state.formValid}
        keyboardFocused
        onTouchTap={this.handleClose}
        onClick={this.handlesubmit}
     />,*/}
    ];
        return(
             <div style={{ display:'inline-block' }}>
             <MuiThemeProvider theme={theme}>
               <Button 
                onClick={this.handleOpen} 
                disabled={this.props&&!this.props.selectJobField}>היקף מישרה</Button>
                </MuiThemeProvider>
                <Dialog style={{direction:'rtl',textAlign:'rtl'}} onClose={this.handleClose} aria-labelledby="simple-dialog-title"
               open={this.state.open}
              >
        <DialogTitle id="simple-dialog-title">בחר תחום</DialogTitle>
               {/*<Dialog
                 title="בחר אזור"
                 actions={actions}
                 modal={false}
                 open={this.state.open}
                 actionsContainerStyle={{ textAlign: 'left' }}
                 style={{ direction: 'rtl', textAlign: 'right' }}
                 onRequestClose={this.handleClose}
               > */}   
                <div>
                {
               (this.props.scopes instanceof Array)?this.props.scopes
               .map((item)=><div><FormControlLabel control={<Checkbox color='primary' 
               
               checked={(this.state.checkedScopesArrId.indexOf(item.uid)>-1)?true:false}
                className='dialogSearchBtn' id={item.uid} value={item.name} 
               onClick={(event)=>{this.handleCheckChange(item,event.target)}}/>} label={item.name}/></div>):''
               }    
                </div> 
                <div> 
              <Button className="btnOk" onClick={this.handlesubmit} 
              style={{float:'left', color: '#4da6ff',border: '#4da6ff solid 2px',margin:9}}>בחר</Button>
            </div>
               </Dialog>
             </div>
            
        )
    }
}

const mapStateToProps = state => ({
     feedback: state.feedback,
     scopes:state.scopes.data,
     selectJobField:state.jobfields.selectJobField,

    });

const mapDispatchToProps = {
    chooseScopes,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogSearchScopes)
