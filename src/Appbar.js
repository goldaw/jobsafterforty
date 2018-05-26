import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Auth from './Auth';
import LeftMenu from './LeftMenu';
import { connect } from 'react-redux';
import { openMenu } from './actions/leftmenu';
import C from './constants/leftmenu.js';
import PropTypes from 'prop-types';

class JafAppBar extends Component {
  getChildContext() {
  	return { muiTheme: getMuiTheme(baseTheme) };
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
  	const aLocales = [
  	{ shortText: 'he', primaryText: 'עברית' },
      { shortText: 'en', primaryText: 'English' }];
    const style = { padding: 0, color: 'white' };
    const iconElementRight = (<div><Auth /></div>);
    return (<div>
      <AppBar
        title="להתבגר בהיי-טק"
        iconElementRight={iconElementRight}
        iconElementLeft={<LeftMenu />}
        iconStyleRight={style}
        onLeftIconButtonClick={this.props.openMenu}
      />

    </div>
    );
  }
}
JafAppBar.childContextTypes = {
  muiTheme: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ menuState: state.menuState });

const mapDispatchToProps = {
  openMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(JafAppBar);
