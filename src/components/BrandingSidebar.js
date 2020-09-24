import React, { Component, Fragment } from 'react';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ColorPicker from 'material-ui-color-picker'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import '../styles/Sidebars.css';

class BrandingSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      right: false,
      standard: '',
      dark: '',
      light: ''
    };
  }

  componentDidMount() {
    this.setState({
      standard: this.props.standard || null,
      dark: this.props.dark || null,
      light: this.props.light || null
    });
  }

  handleColorChange = (e) => {
    if (e) {
      const type = 'standard'
      let color = e;
      this.setState({ [type]: color });
    }
  };

  handleSubmit = () => {
    const { standard, light, dark } = this.state;
    this.props.updateBranding(standard, light, dark);
    this.setState({
        ...this.state, 
        right: false
    });
  }
    
  handleClose = () => {
    this.setState({ ...this.state, right: false});
  }

  child = (anchor) => (
    <div className='Discount-Container'>
      <div className='Header'>
        <h2>Branding</h2>
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
      <ColorPicker
        name='color'
        defaultValue='#000'
        onChange={this.handleColorChange}
        />
      <div className='Buttons-Container-Discount'>
        <Button
          color="secondary"
          className='Cancel'
          onClick={this.handleClose}
        >
          Cancel
        </Button>

        <Button
          color="primary"
          style={{ alignContent: 'flex-end' }}
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
            <div onClick={this.toggleDrawer(anchor, true)}>Edit Branding</div>
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

export default BrandingSidebar;
