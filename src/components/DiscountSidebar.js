import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/Sidebars.css';
import '../styles/WorkingDoc.css';

const initialState = {
  right: false,
  percent: '',
  value: ''
};

class DiscountSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      percent: '',
      value: ''
    };
  }

  // componentDidMount() {
  //   this.setState({
  //     value: '40000' || this.props.discountValue,
  //     percent: '40' || this.props.discountPercent
  //   });
  // }

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

  handleSubmit = () => {
    const percent = this.state.percent;
    const value = this.state.value;
    this.props.updateDiscounts(percent, value);
    this.setState({ ...this.state, right: false });
  }

  HandleRemoveDiscount = () => {
    this.props.removeDiscount(percent, value)
    this.setState(initialState);
  }

  handleCancel = () => {
    this.setState(initialState);
  }

  child = (anchor) => (
    <div className='Discount-Container'>
      <div className='Header'>
        <h2>Discount</h2>
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
            <div style={{width: '100%'}} onClick={this.toggleDrawer(anchor, true)}>
              <div>
                {!value &&
                  <div className="discount-button">
                    + Discount
                  </div>
                }
                {value &&
                  <div className='discount'>
                    <span>Discount ({percent}%)</span>
                    <span>${value}</span>
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

export default DiscountSidebar;


