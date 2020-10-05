import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MyDatePicker from './MyDatePicker';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import '../styles/Sidebars.css';

class DatePickerSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      date: ''
    };
  }

  handleSubmit = () => {
    this.props.updateDate(this.state.date);
    this.handleClose();
  }

  updateDate = (date) => {
    this.setState({ ...this.state, date });
  }

  handleClose = () => {
    this.setState({ ...this.state, right: false });
  }

  child = (anchor) => (
    <div className='Date-Container'>
      <div className='Header'>
        <h2>Select Date</h2>
        <HighlightOffIcon
          onClick={this.handleClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            fontSize: '26px !important'
          }}
        />
      </div>
      <section className='Color-Picker'>
        <MyDatePicker
          updateDate={this.updateDate}
          date={this.state.date}
        />
      </section>

      <div className='Buttons-Container-Discount'>
        <Button
          style={{ fontSize: '20px' }}
          color="secondary"
          className='Cancel'
          onClick={this.handleClose}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          style={{ fontSize: '20px' }}
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
      <div >
        {['right'].map((anchor) => (
          <Fragment key={anchor}>
            <div
              style={{ paddingRight: '4px' }}
              onClick={this.toggleDrawer(anchor, true)}
            >
              Due: {this.props.displayDate}
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

export default DatePickerSidebar;
