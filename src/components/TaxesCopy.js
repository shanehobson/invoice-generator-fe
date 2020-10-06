import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import '../styles/Sidebars.css';
import '../styles/WorkingDoc.css';

class Taxes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: '',
      value: '',
      taxLabel: '',
      label: '',
      index: 0 
    };
  }

  static getDerivedStateFromProps (props, state) {
    if (!props.discountValue || !state.value) {
      return {
        ...state,
        index: props.index
      }
    } else {
      const discount = parseFloat(props.discountValue) || 0;
      let label;
      if (props.taxItem) {
        label = props.taxItem.label;
      }
      return {
        ...state,
        label,
        index: props.index,
        value: (state.percent / 100 * (props.subtotal - discount)).toFixed(2).toString()
      }
    }
}

calculatePercent = (value = '0', subtotal) => {
    const discount = this.props.discountValue || 0;
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
    let percent = e.target.value || '';
    percent = parseFloat(percent)
    const subtotal = this.props.subtotal;
    const value = this.calculateValue(percent, subtotal);

    const taxItem = {
      label: this.state.label || '',
      value, 
      percent
    }
    this.updateParent(taxItem, this.state.index);
    this.setState({ ...this.state, percent, value });
  };

  handleValueChange = e => {
    let value = e.target.value || '';
    value = parseFloat(value);
    const subtotal = this.props.subtotal;
    const percent = this.calculatePercent(value, subtotal)
    const taxItem = {
      label: this.state.label || '',
      value, 
      percent
    }
    this.updateParent(taxItem, this.state.index);
    this.setState({ ...this.state, percent, value });
  };

  updateParent = (taxItem) => {
    this.props.updateTaxItem(taxItem, this.state.index);
  }

  handleLabelChange = e => {
    const taxLabel = e.target.value || '';
    this.setState({ taxLabel });
  };

  child = () => (
    <div className='Tax-Item'>
      <TextField
        style={{
          marginLeft: '40px',
          width: '140px',
          paddingTop: '10px',
        }}
        fullWidth
        variant="outlined"
        placeholder="Tax Label"
        onChange={this.handleLabelChange}
        value={this.state.taxLabel || ''}
      >
      </TextField>
      <section className='Tax-Sidebar'>
        <div>
          <span className='RateDollarSymbol'>Percentage</span>
          <TextField
            style={{
              width: '140px',
              paddingTop: '10px'
            }}
            inputProps={{
              style: { textAlign: "right" }
            }}
            fullWidth
            variant="outlined"
            placeholder="0.00%"
            onChange={this.handlePercentChange}
            value={this.state.percent || ''}
          >
          </TextField>
        </div>
        <div className='Equals'> = </div>
        <div>
          <span className='RateDollarSymbol'>Value</span>
          <TextField
            style={{
              width: '140px',
              paddingTop: '10px',
            }}
            fullWidth
            variant="outlined"
            placeholder="$0.00"
            onChange={this.handleValueChange}
            value={this.state.value || ''}
          >
          </TextField>
        </div>
      </section>
    </div>
  );

  render() {
    return (
        <div>
          {this.child()}
        </div>
    )
  }
}

export default Taxes;


