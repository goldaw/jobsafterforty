import React, { Component } from "react";
import { connect } from "react-redux";
import { openAuth} from "./actions/auth";
import C from "./constants/auth.js";
import DialogRegistration from "./Registration.js";
import DialogLogin from "./Login.js";
import { TableRowColumn } from "material-ui";
const Auth = props => {
  var Style={display: 'flex', flexDirection: 'row'}
  switch (props.auth.status) {

    case C.AUTH_LOGGED_IN:
      return (
        <div><span>{props.auth.username} שלום</span></div>
      );
      break;

    case C.AUTH_ANONYMOUS:
      return (<div style={Style}>
          <DialogRegistration></DialogRegistration>
          <DialogLogin onClick={props.openAuth}></DialogLogin>
          </div>
      );
      default:
      return (<div></div>);
      break;
    }
};

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = {
  openAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
