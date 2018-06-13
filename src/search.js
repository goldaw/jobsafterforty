import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { database } from './firebaseApp';
import { submitSearch } from './actions/jobs';
import store from './store/index.js';
import { connect } from 'react-redux';
import './search.css';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

const INITIAL_STATE = {
    selectedcategory:'',
    valueSearch:'',
  };
class Search extends React.Component{

    constructor(props) {
     super(props);
    this.state={...INITIAL_STATE};
    this.handleFieldChange=this.handleFieldChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}
/*
  position: '',
  company: '',
  description: '',
  location: '',
  contact_details: '',
*/
 handleFieldChange(name, value) {
    this.setState(byPropKey(name, value));//לבדוק אם משנה סטיט
  }
  handleSubmit() {
    store.dispatch(submitSearch({
      selectedcategory:this.state.selectedcategory,
      valueSearch:this.state.valueSearch,
    }));
  }
  
    render(){//to add
        const {
            selectedcategory,
            valueSearch,
          } = this.state;
      
          const actions = [
          
          ];
        return(
        <form onSubmit={e => {
          e.preventDefault()
          
          }}>
          <input type='button'
            value='חפש'
            onClick={this.handleSubmit}/>
         
           <div className='inline'>
           <input className='input-search'  type='text' id="valueSearch" name="valueSearch" 
             defaultValue={this.state.valueSearch} onChange={(event) => { this.handleFieldChange('valueSearch', event.target.value); }} />
           <select className='input-search' id="selectedcategory" defaultValue={this.state.selectedcategory} name="selectedcategory" onChange={(event)=>{this.handleFieldChange('selectedcategory',event.target.value)}}>
            <option value="position" ></option>
            <option value="position">תפקיד</option>
            <option value="location">מיקום</option>
            <option value="company">חברה</option>
           </select>

           </div>
           
        </form>
        )
    }
}

const mapDispatchToProps = {
    submitSearch,
  };
  export default connect('',mapDispatchToProps)(Search);