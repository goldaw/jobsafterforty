import React from 'react';
// Dialog from 'material-ui/Dialog';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
//import CheckBoxIcon from '@material-ui/icons/CheckBox';
//import Favorite from '@material-ui/icons/Favorite';
//import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//import regionItems from './regionItems';
import {chooseRegion} from './actions/regions';
import { listenToRegions } from './actions/regions';
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
   // regions:regionItems.regions,
    selectRegion:'',
    selectRegionName:'',
} ;   

class DialogCooseRegion extends React.Component{
    constructor(props){
        super(props);
        this.state={...INITIAL_STATE};
        this.handleOpen=this.handleOpen.bind(this);
        this.handleClose=this.handleClose.bind(this);
        this.handleSelectRegionChange=this.handleSelectRegionChange.bind(this);
        this.makeRegion=this.makeRegion.bind(this);
        this.handlesubmitRegion=this.handlesubmitRegion.bind(this);
    }
    componentDidMount(){
        store.dispatch(listenToRegions());
    }
    handleOpen(){
        this.setState({open:true});
    }
    handleClose(){
        this.setState({open:false});
    }
    handleSelectRegionChange(name,e){
        //this.setState(byPropkey(name,value));
        this.setState({
            selectRegion:e.id,
            selectRegionName:e.value,
        })
    }         
    makeRegion(item){
        return <div> <input className='dialogRegionBtn' type='button' id={item.uid} onClick={(event)=>{this.handleSelectRegionChange('selectRegion',event.target)}} value={item.name}/></div>;
    }
handlesubmitRegion(){
    this.handleClose();
    store.dispatch(chooseRegion({
        selectRegion:this.state.selectRegion,
        selectRegionName:this.state.selectRegionName,
    }));
}
    render(){

        const {
            open,
            name,
            selectRegion,
            selectRegionName,
        }=this.state;
         const actions = [
     {/* <FlatButton
        label="אישור"
        primary
        //disabled={!this.state.formValid}
        keyboardFocused
        onTouchTap={this.handleClose}
        onClick={this.handlesubmitRegion}
     />,*/}
    ];
        return(
             <div style={{ display:'inline-block' }}>
             <MuiThemeProvider theme={theme}>
               <Button 
              // buttonStyle={{borderRadius:50}}
              // style={{ margin: 15,borderRadius:50,height:94,width: 94}}
                onClick={this.handleOpen} 
                disabled={this.props&&!this.props.selectJobField}>בחר אזור</Button>
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
                <div>{this.props.regions.length?this.props.regions.map(this.makeRegion):''}</div> 
                <div> 
              <Button className="btnOk" onClick={this.handlesubmitRegion} 
              style={{float:'left', color: '#4da6ff',border: '#4da6ff solid 2px',margin:9}}>בחר</Button>
            </div>
               </Dialog>
             </div>
            
        )
    }
}

const mapStateToProps = state => ({
     feedback: state.feedback,
     regions:state.regions.data,
     selectJobField:state.jobfields.selectJobField,

    });

const mapDispatchToProps = {
  chooseRegion,
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogCooseRegion)
