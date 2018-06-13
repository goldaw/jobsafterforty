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
    position: '',
    company: '',
    description: '',
    location: '',
    contact_details: '',
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
      position: this.state.position,
      //company: this.state.company,
     // description: this.state.description,
      location: this.state.location,
      //contact_details: this.state.contact_details,
    }));
  }
  
    render(){//to add
        const {
            position,
            location,
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
            <input className='input-search'  type='text' id="location" name="location" 
             defaultValue={this.state.location} onChange={(event) => { this.handleFieldChange('location', event.target.value); }} />
            <label className='input-search'  htmlFor="location">מיקום</label>
            </div>
            <div className='inline'>
            <input className='input-search' type='text' id="position" name="position"
             defaultValue={this.state.position} onChange={(event) => { this.handleFieldChange('position', event.target.value); }} />
            <label className='input-search'  htmlFor="position">תפקיד</label>

           </div>
           
        </form>
        )
    }
}

const mapDispatchToProps = {
    submitSearch,
  };
  export default connect('',mapDispatchToProps)(Search);