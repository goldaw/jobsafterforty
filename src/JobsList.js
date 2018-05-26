import React from 'react';

import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider/Divider';
import Subheader from 'material-ui/Subheader/Subheader';
import Avatar from 'material-ui/Avatar/Avatar';
import {grey400, darkBlack, lightBlack, green100} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu/IconMenu';
import MenuItem from 'material-ui/MenuItem/MenuItem';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';


const JobsList = () => (
  <div style={{textAlign:'left'}}>
 <List>
 <Subheader style={{color:'black'}}>Software</Subheader>
 <ListItem style={{color:darkBlack}}
          leftAvatar={<CheckCircle color={green100} />}
          primaryText="Senior Developer"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>תל אביב</span> 
            </p>
          }
          secondaryTextLines={2}
        />
 <ListItem style={{color:darkBlack}}
          leftAvatar={<CheckCircle color={green100} />}
          primaryText="איש תמיכה למוקד שירות"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>תל קיבוץ אילות</span> 
            </p>
          }
          secondaryTextLines={2}
        />        
 </List>
 </div>
);

export default JobsList;
