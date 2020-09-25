import React, { Component } from 'react';
import InvoiceItem from './InvoiceItem';
import EditIcon from '@material-ui/icons/Edit';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

class EditInvoice extends Component {
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
    this.props.updateInvoiceItem({item, index: this.props.index});
    this.setState({ ...this.state, right: false });
  }

  handleClose = () => {
    this.setState({ ...this.state, right: false });
  }

  child = (anchor) => {
    const {description, unit, rate, feeType, total} = this.props.item;
    return (
        <div
        style={{width: '350px', padding: '10px 20px'}}
        role="presentation"
        // onKeyDown={this.toggleDrawer(anchor, false)}
      >
        <h2>Line Item</h2>
           <InvoiceItem
                removable={false}
                index={this.props.index}
                item={
                  {
                    description: description ? description : '',
                    unit: unit ? unit : '1',
                    rate: rate ? rate : '',
                    feeType: feeType ? feeType : 'Flat fee',
                    total: total ? total : ''
                  }
                }
              
                FeeTypes={this.props.FeeTypes}
                updateInvoiceItem={this.updateInvoiceItem}
                invoiceItems={this.props.invoiceItems}
            >
            </InvoiceItem>
            <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
      </div>
    )  
  };


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
            <EditIcon onClick={this.toggleDrawer(anchor, true)}>+ Add Line Item</EditIcon>
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

export default EditInvoice;