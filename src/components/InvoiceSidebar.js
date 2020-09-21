import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import InvoiceItem from './InvoiceItem';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import '../styles/WorkingDoc.css';
import '../styles/Sidebars.css';

class InvoiceSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      item: null,
    };
  }

  updateInvoiceItem = (item) => {
    this.setState({ item });
  }

  handleSubmit = () => {
    const item = this.state.item;
    this.props.updateInvoiceItem(item);
    this.setState({ ...this.state, right: false });
  }

  handleClose = () => {
    this.setState({ ...this.state, right: false });
  }

  child = (anchor) => (
    <div
      style={{ width: '350px', padding: '10px 20px' }}
      role="presentation"
    >
      <h2>Line Item</h2>
      <section className='PercAndVal'>
        <InvoiceItem
          removable={false}
          index={this.props.index}
          item={
            {
              description: '',
              unit: '1',
              rate: '',
              feeType: 'Flat fee',
              total: 0.00
            }
          }

          FeeTypes={this.props.FeeTypes}
          updateInvoiceItem={this.updateInvoiceItem}
          invoiceItems={this.props.invoiceItems}
        >
        </InvoiceItem>
      </section>

      <DialogActions className='Buttons-Container'>
        <Button onClick={this.handleClose} color="secondary">
          Cancel
            </Button>
        <Button onClick={this.handleSubmit} color="primary">
          Submit
            </Button>
      </DialogActions>
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

const mapStateToProps = (state) => ({
  FeeTypes: state.FeeTypes
});

export default  connect(mapStateToProps)(InvoiceSidebar);