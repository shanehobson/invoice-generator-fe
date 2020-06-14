import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

class NotesSidebar extends Component {
  constructor(props) {
      super(props);

      this.state = {
          right: false,
          open: false,
          notes: ''
    };
  }

  updateNotes= (notes) => {
    this.setState({notes});
  }

  handleSubmit = () => {
    const notes = this.state.notes;
    this.props.updateNotes(notes)
    this.setState({ ...this.state, right: false});
  }

  handleClose = () => {
    this.setState({ ...this.state, right: false});
  }

  child = (anchor) => (
    <div>
    <Dialog
        open={true}
        onClose={this.handleSubmit}
        aria-labelledby="alert-dialog-title"
    >
        <DialogTitle id="alert-dialog-title">{"Notes"}</DialogTitle>
        <DialogContent>
            <TextField
                 style={{height: '400px', width: '400px'}}
                 onKeyPress={(ev) => {
                    if (ev.key === 'Enter') {
                      this.handleSubmit;
                      ev.preventDefault();
                    }
                  }}

                  inputProps={{
                    maxLength: 1000,
                  }}
                
                autoFocus
                id="name"
                multiline
                value={this.state.notes}
                rows={4}
                label="Add a Note..."
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                onChange={e => this.setState({
                  notes: e.target.value
                })}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
                Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
                Submit
            </Button>
        </DialogActions>
    </Dialog>     
</div>
);


  toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    console.log(this.props)
    this.setState({ ...this.state, notes: this.props.notes, [anchor]: open });
};

  render() {
    return (
      <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>+ Notes</Button>
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

export default NotesSidebar;