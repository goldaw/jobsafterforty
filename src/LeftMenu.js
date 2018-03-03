import React from 'react';
import Popover from 'material-ui/Popover/Popover';
import IconMenu from 'material-ui/IconMenu/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import { connect } from "react-redux";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { logoutUser } from "./actions/auth";
import C from "./constants/auth.js";
const LeftMenu = (props) => (
    <div id="LeftMenu">
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem primaryText="יציאה" onClick={props.logoutUser} />
      </IconMenu>
     </div>
  );
  const mapStateToProps = state => ({ auth: state.auth });
  const mapDispatchToProps = {
    logoutUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);