import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Taxes from './Taxes';
import '../styles/Sidebars.css';
import '../styles/WorkingDoc.css';

class TaxesSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      percent: '',
      value: '',
      taxLabel: '',
      taxItems: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let taxItems = state.taxItems;
    if (!taxItems || taxItems.length === 0) {
      taxItems = [{
        value: 0,
        percent: 0,
        label: ''
      }];
    }
    console.log(taxItems)
    if (!props.discountValue || !state.value) {
      return {
        ...state,
        taxItems
      }
    } else {
      const discount = parseFloat(props.discountValue) || 0;
      const subtotal = parseFloat(props.subtotal) || 0;
      return {
        ...state,
        taxItems,
        value: (state.percent / 100 * (subtotal - discount)).toFixed(2).toString()
      }
    }
  }

  calculatePercent = (value = '0', subtotal, discount = null) => {
    if (!discount) {
      discount = this.props.discountValue || 0;
    }

    value = parseFloat(value) || 0;
    if (subtotal === 0) {
      return 0;
    } else {
      return (value / (subtotal - discount) * 100).toFixed(2).toString();
    }
  }

  calculateValue = (percent, subtotal) => {
    const discount = this.props.discountValue || 0;
    return (percent / 100 * (subtotal - discount)).toFixed(2).toString();
  }

  handlePercentChange = e => {
    const percent = e.target.value || '';
    const subtotal = this.props.subtotal;
    const value = this.calculateValue(percent, subtotal);
    this.setState({ percent, value });
  };

  handleValueChange = e => {
    const value = e.target.value || '';
    const subtotal = this.props.subtotal;
    const percent = this.calculatePercent(value, subtotal)
    this.setState({ percent, value });
  };

  handleLabelChange = e => {
    const taxLabel = e.target.value || '';
    this.setState({ taxLabel });
  };

  handleSubmit = () => {
    const percent = this.state.percent;
    const value = this.state.value;
    const taxLabel = this.state.taxLabel;
    this.props.updateTaxes(value, percent, taxLabel);

    this.setState({
      ...this.state,
      right: false
    });
  }

  updateTaxItem = (taxItem, index) => {
    const taxItems = this.state.taxItems;
    taxItems[index] = taxItem;
    const { value, percent } = this.calculateTotal(taxItems);
    this.setState({
      ...this.state,
      taxItems,
      value,
      percent
    });
  }

  addEmptyTaxItem = (e) => {
    this.addTaxItem(null);

  }

  addTaxItem = (taxItem) => {
    if (!taxItem) {
      taxItem = {
        value: 0,
        percent: 0,
        label: ''
      }
    }
    const taxItems = this.state.taxItems;
    taxItems.push(taxItem);
    this.setState({
      ...this.state,
      taxItems
    });
  }

  removeTaxItem = (index) => {
    const taxItems = this.state.taxItems;
    if (taxItems[index]) {
      taxItems.splice(index, 1);
      this.setState({
        ...this.state,
        taxItems
      });
    }
  }

  calculateTotal = (taxItems) => {
    const discount = this.props.discountValue || 0;
    const subtotal = this.props.subtotal || 0;
    let value = 0;

    taxItems.forEach(item => {
      item.value = (parseFloat(item.value) * 1).toFixed(2);
      value += item.value;
    });
    const percent = this.calculatePercent(value, subtotal, discount);
    return { value, percent };
  }

  handleRemoveTaxes = (value, percent, taxLabel) => {
    this.props.removeTaxes();
    this.props.updateTaxes(value, percent);
    this.setState({ ...this.state, value, percent, taxLabel })
  }

  handleCancel = () => {
    this.setState({
      ...this.state,
      right: false,
      percent: '',
      value: '',
      taxLabel: ''
    });
  }

  child = (anchor, taxItems) => (
    <div className='Tax-Container'>
      <div className='Tax-header'>
        <h2>Taxes</h2>
        <HighlightOffIcon
          onClick={this.handleCancel}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: '26px !important'
          }}
        />
      </div>

      {taxItems.map((taxItem, index) => (
        <Taxes
          taxItem={taxItem}
          index={index}
          key={index}
          updateTaxItem={this.updateTaxItem}
          // addTaxItem={this.addTaxItem}
          removeTaxItem={this.removeTaxItem}
          discountValue={this.props.discountValue}
          subtotal={this.props.subtotal}
        />
      ))}

      <div className='Tax-Icons'>
        <AddCircleIcon 
          onClick={this.addEmptyTaxItem}
          style={{display: 'flex', alignContent: 'center'}} 
        />
        <span>Add Another Tax</span>    
        <DeleteIcon onClick={this.removeTaxItem} />
        <p>Remove Tax</p>
      </div>




      <div className='Buttons-Container-Taxes'>
        <Button
          style={{ fontSize: '16px' }}
          color="secondary"
          className='Cancel'
          onClick={this.handleCancel}
        >
          Cancel
        </Button>
        <Button
          style={{ fontSize: '16px' }}
          color="primary"
          className='#Subtotal'
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );


  toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [anchor]: open });
  };

  render() {
    const { value, percent, taxLabel, taxItems } = this.state;
    return (
      <Fragment>
        {['right'].map((anchor) => (
          <Fragment key={anchor}>
            <div style={{ width: '100%' }}>
              <div>
                {!value &&
                  <div id='Taxes' onClick={this.toggleDrawer(anchor, true)}>
                    + Taxes
                  </div>
                }
                {value &&
                  <div className='discount'>
                    <span className='Percent-Value'>{taxLabel}({percent}%)</span>
                    <span className='Discount-Value'>${value}</span>
                    <span className='Discount-Icons'>
                      <DeleteIcon
                        onClick={() => this.handleRemoveTaxes()}
                        style={{ fontSize: '20px', paddingRight: '10px' }}
                      />
                      <EditIcon
                        onClick={this.toggleDrawer(anchor, true)}
                        style={{ fontSize: '20px' }}
                      />
                    </span>
                  </div>
                }
              </div>
            </div>

            <SwipeableDrawer
              anchor={anchor}
              open={this.state[anchor]}
              onClose={this.toggleDrawer(anchor, false)}
              onOpen={this.toggleDrawer(anchor, true)}
            >
              {this.child(anchor, taxItems)}
            </SwipeableDrawer>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default TaxesSidebar;


