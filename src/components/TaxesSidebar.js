import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/Sidebars.css';
import '../styles/WorkingDoc.css';
import { FormHelperText } from '@material-ui/core';

const initialState = {
  right: false,
  percent: '',
  value: ''
};

class TaxesSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      percent: '',
      value: '',
      
    };
  }

calculateValue = (percent, subtotal) => {
    return (percent / 100 * subtotal).toFixed(2).toString();
  }

calculatePercent = (value = '0', subtotal) => {
    value = parseFloat(value) || 0;
    if (subtotal === 0) {
      return 0;
    } else {
      return (value / subtotal * 100).toFixed(2).toString();
    }
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
    const label = e.target.value || '';
    this.setState({ label });
  };

  handleSubmit = () => {
    console.log(taxes)
    const percent = this.state.percent;
    const value = this.state.value;
    const taxes = this.props.taxes;
    console.log(taxes)
    this.props.updateTaxes(value, percent, taxes);
    this.setState({ ...this.state, right: false });
  }

  handleRemoveTaxes = (value, percent) => {
    this.props.removeTaxes();
    this.props.updateTaxes(value, percent);
    this.setState({ ...this.state, value, percent })
  }

  handleCancel = () => {
    this.setState({
        ...this.state,
        right: false,
        percent: '',
        value: ''
    });
  }

  child = (anchor) => (
    <div className='Discount-Container'>
      <div className='Header'>
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
      <TextField
            style={{
              marginLeft: '40px',
              width: '140px',
              paddingTop: '10px'
            }}
            fullWidth
            variant="outlined"
            placeholder="Tax Label"
            onChange={this.handleLabelChange}
            value={this.state.label || ''}
          >
      </TextField>
      <section className='PercAndVal'>
        <div>
          <span className='RateDollarSymbol'>Percentage</span>
          <TextField
            style={{
              width: '140px',
              paddingTop: '10px'
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
      <div className='Buttons-Container-Discount'>
        <Button
          color="secondary"
          className='Cancel'
          onClick={this.handleCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          style={{ alignContent: 'flex-end' }}
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
    const { value, percent } = this.state;
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
                      <span className='Percent-Value'>Tax ({percent}%)</span>
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
              {this.child(anchor)}
            </SwipeableDrawer>
          </Fragment>
        ))}
      </Fragment>
    );
  }
}

export default TaxesSidebar;


