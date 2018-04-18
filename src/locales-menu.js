import React, { Component } from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem/MenuItem';

class LocalesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.sLocale };
  }
  handleChange(event, index, value) {
    this.setState({ value });
    this.props.setLocale(value);
  }
  render() {
    const menuItems = this.props.locales.map((oLocale, idx) => <MenuItem key={idx} value={oLocale.shortText} primaryText={oLocale.primaryText} />);
    return (
      <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {menuItems}
          </DropDownMenu>
    );
  }
}

export default LocalesMenu;
