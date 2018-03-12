import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import LocalesMenu from './locales-menu';
import Auth from './Auth';
import LeftMenu from './LeftMenu';
import { connect } from "react-redux";
import { openMenu} from "./actions/leftmenu";
import C from "./constants/leftmenu.js";

class JafAppBar extends Component {
  getChildContext() {
  	return { muiTheme: getMuiTheme(baseTheme) };
  }	
  constructor(props) {
    super(props)
    this.state={}
  }

  render() {
  	const aLocales=[
  	{shortText: "he", primaryText: "עברית"},
    {shortText: "en", primaryText: "English"}];
    const style={padding:0, color: 'white'}
    let iconElementRight = (<div><Auth></Auth></div>)
  return (<div>
  <AppBar
    title="להתבגר בהיי-טק"
    iconElementRight={iconElementRight}
    iconElementLeft={<LeftMenu></LeftMenu>}
    iconStyleRight={style}
    onLeftIconButtonTouchTap={this.props.openMenu}
  >
  </AppBar>

  </div>
	);
}}
       JafAppBar.childContextTypes = {
            muiTheme: React.PropTypes.object.isRequired,
        };

const mapStateToProps = state => ({ menuState: state.menuState });

const mapDispatchToProps = {
  openMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(JafAppBar);