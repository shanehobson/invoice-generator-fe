import React, { Component } from 'react';
import InvoiceItem from './InvoiceItem';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';



class InvoiceSidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          right: false
          // FeeTypes: []
    };
  }

  
//   componentDidMount() { 
//     this.setState({ 
//         FeeTypes: this.props.FeeTypes
//     })
// }

  list = (anchor) => (
    <div
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
 
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
      <div id='Add-Line-Item'>
          {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer
              anchor={anchor}
              open={this.state[anchor]}
              onClose={this.toggleDrawer(anchor, false)}
              // onOpen={this.toggleDrawer(anchor, true)}
              >
              {this.list(anchor)}
            </Drawer>
        </React.Fragment>
      ))}
      </div>     
    )
  }
}

export default InvoiceSidebar;