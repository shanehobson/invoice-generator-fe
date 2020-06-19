import React, { Component, Fragment } from 'react';
import InvoiceItem from './InvoiceItem';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import '../styles/WorkingDoc.css';

class InvoiceSidebar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          right: false,
          item: null
    };
  }

  updateInvoiceItem = (item) => {
    this.setState({item});
  }

  handleSubmit = () => {
    const item = this.state.item;
    this.props.updateInvoiceItem(item);
    this.setState({ ...this.state, right: false });
  }

  child = (anchor) => (
    <div
      style={{width: '400px', padding: '10px 20px'}}
      role="presentation"
    >
      <h2>Line Item</h2>
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
              updateInvoiceItem={this.updateInvoiceItem}
              invoiceItems={this.props.invoiceItems}
          >
          </InvoiceItem>
          <button onClick={this.handleSubmit}>
              Submit
          </button>
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
          <Fragment key={anchor}>
            
            <div
              className='Add-Line-Item'
              onClick={this.toggleDrawer(anchor, true)}
            >
              + Add Line Item
            </div>

            <SwipeableDrawer
              anchor={anchor}
              open={this.state[anchor]}
              onClose={this.toggleDrawer(anchor, false)}
              onOpen={this.toggleDrawer(anchor, true)}
            >
              {this.child(anchor)}
            </SwipeableDrawer>
          </Fragment>
        ))}
      </div>
    );
  }
}

export default InvoiceSidebar;