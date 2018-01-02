import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default class DialogRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  
  render() {
    const style= {fontSize:12,display:'block'}
    const actions = [
      <FlatButton
        label="אישור"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div>
      <div>
        <RaisedButton style={style} label="הרשמה" onTouchTap={this.handleOpen} />
        <Dialog
          title="הרשמה"
          actions={actions}
          modal={false}
          open={this.state.open}
          actionsContainerStyle={{textAlign:"left"}}
          style={{direction:'rtl',textAlign:'right'}}
          onRequestClose={this.handleClose}
        >
          <label class=""></label>
          <TextField hintText="נא למלא שדה זה" />
        </Dialog>
      </div>
      </div>
    );
  }
}