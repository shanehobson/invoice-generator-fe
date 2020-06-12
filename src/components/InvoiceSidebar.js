import React, { Component } from 'react';
import InvoiceItem from './InvoiceItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

class InvoiceSidebar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          right: false
    };
  }

  
//   componentDidMount() { 
//     this.setState({ 
//         FeeTypes: this.props.FeeTypes
//     })
// }

  child = (anchor) => (
    <div
      style={{width: '330px'}}
      role="presentation"
      onClick={this.toggleDrawer(anchor, false)}
      onKeyDown={this.toggleDrawer(anchor, false)}
    >
         <InvoiceItem
              index={this.props.index}
              item={
                {
                  description: '',
                  unit: '1',
                  rate: '',
                  feeType: '',
                  total: ''
                }
              }
              FeeTypes={this.props.FeeTypes}
              updateInvoiceItem={this.props.updateInvoiceItem}
              invoiceItems={this.props.invoiceItems}
          >
          </InvoiceItem>
    </div>
  );


  toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [anchor]: open });
};

  render() {
    return (
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>Add Line Item</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={this.state[anchor]}
              onClose={this.toggleDrawer(anchor, false)}
              onOpen={this.toggleDrawer(anchor, true)}
            >
              {this.child(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
    );
  }
}

export default InvoiceSidebar;