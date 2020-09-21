import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import '../styles/Sidebars.css';

class DiscountSidebar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          right: false,
          percent: undefined,
          value: undefined
    };
  }

calculateValue = (percent, subtotal) => {
  subtotal= this.props.subtotal;
  if (!percent) {  percent = '0' }
  percent = this.state.percent;
  // percent = this.stringToNumber(percent);
  return (percent * subtotal/10).toFixed(2).toString();
}

// stringToNumber(str) {
//   if (!str) return 0;
//   if (typeof str === 'number') return str;

//   const arr = str.split('');
//   const filteredArr = arr.filter(char => {
//       const nums = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
//       const isNumber = nums.indexOf(char) > - 1;
//       const isPeriod = char === '.';
//       return isNumber || isPeriod;
//   });

//   const isDecimal = filteredArr.indexOf('.') > -1;
//   const joined = filteredArr.join('');

//   if (!isDecimal) {
//       return parseInt(joined);
//   } else {
//       const dollars = joined.split('.')[0];
//       const cents = joined.split('.')[1] || 0;
//       return parseInt(dollars, 10) + (parseFloat(cents / 100, 10));
//   }
// }

updateDiscounts = (percent, value) => {
  this.setState({percent, value});
}

handleSubmit = () => {
  const percent = this.state.percent;
  const value = this.state.value;
  this.props.updateDiscounts(percent, value);
  this.setState({ ...this.state, right: false });
}

handlePercentChange = e => {
     const percent = e.target.value || '';
     const subtotal=this.props.subtotal;
     const value = this.calculateValue(percent, subtotal);
     console.log(subtotal);
    this.setState({ percent, value });
};

handleValueChange = e => {
  const value = e.target.value || '';
  this.setState({ value });
};

// handleSubmit = () => {
//     this.setState({ ...this.state, right: false });
//   }



  child = (anchor) => (
    <div className='Discount-Container'>
      <div className='Header'>
        <h2 className='Title'>Discount</h2>
        <HighlightOffIcon
          onClick={this.handleSubmit}
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
                value={this.state.percent}
            >
            </TextField>
            {/* <span>%</span> */}
        </div>
        <div className='Equals'>
          =
        </div>
        <div>
            <span className='RateDollarSymbol'>Value</span>
            {/* <span>$</span> */}
            <TextField
                style={{
                  width: '140px', 
                  paddingTop: '10px',
                }}
                fullWidth
                variant="outlined"
                placeholder="$0.00"
                onChange={this.handleValueChange}
                value={this.state.value}
            >
            </TextField>
        </div>
      </section>
      <div className='Buttons-Container'>
        <Button
          className='Cancel'
          onClick={this.handleSubmit}
        >
            Cancel
        </Button>
             
        <Button
          style={{alignContent: 'flex-end'}}
          className='Submit'
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
    return (
      <div>
        {['right'].map((anchor) => (
          <Fragment key={anchor}>
            <div onClick={this.toggleDrawer(anchor, true)}>+ Discount</div>
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

export default DiscountSidebar;