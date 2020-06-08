import React, { Component, Fragment } from 'react';


import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';

class Contract extends Component {
  constructor(props) {
      super(props);
      this.state = {
          right: false
    };
  }

  list = (anchor) => (
    <div
     
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );


  toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return;
    }

    this.setState({ ...this.state, [anchor]: open });
};

  render() {
    return (
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
            anchor={anchor}
            open={this.state[anchor]}
            onClose={this.toggleDrawer(anchor, false)}
            onOpen={this.toggleDrawer(anchor, true)}
            >
            {this.list(anchor)}
            </Drawer>
        </React.Fragment>
      ))}
    )
  }
}