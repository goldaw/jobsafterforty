import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LocalesMenu from './locales-menu';
import { auth } from './firebaseApp';
import { database } from './firebaseApp';
const jobsRef = database.ref('jobs');
auth.signInWithEmailAndPassword("anatdaganster@gmail.com", "wSQhDvJUO1t9W25hgKZo").catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("auth error " + errorCode + " " + errorMessage);
  // ...
});
auth.onAuthStateChanged(function(user) {
	console.log(user);
});

class JafAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {jobs: []};
  } 
  getChildContext() {
  	return { muiTheme: getMuiTheme(baseTheme) };
  }	

  render() {
  	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
  	{shortText: "en", primaryText: "English"}];

jobsRef.off();
var comp = this;
jobsRef.on('value', (snapshot) => {
	console.log("1")
	comp.setState({jobs: Object.keys(snapshot.val()).map((qid) => {
		console.log(snapshot.val()[qid]);
		return <b>{snapshot.val()[qid]}</b>
	})});
	console.log(this.state.jobs);
});
  return (<div>
  <AppBar
    title={this.state.jobs.length? this.state.jobs : "Loading..."} 
    iconElementRight={<LocalesMenu locales={aLocales} sLocale={this.props.sLocale} setLocale={this.props.setLocale}/>}
  />
  </div>
	);
}}
       JafAppBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

export default JafAppBar;