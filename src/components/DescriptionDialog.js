import React from 'react';
import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DialogTabContent1 from './DialogTabContent1';
import DialogTabContent2 from './DialogTabContent2';

const style = {
    tabLabel: {
        fontSize: 14
    }
}

class DescriptionDialog extends Component {

    state = {
        value: 0
    };

    handleClose = () => {
        this.props.onClose();
    };

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        
        const { open } = this.props;

        return (
            <Dialog open={open} onClose={this.handleClose}>
                <Tabs value={this.state.value} onChange={this.handleTabChange} fullWidth={true} >
                    <Tab label="Basic Description" classes={{label: this.props.classes.tabLabel}} />
                    <Tab label="Description With Timetable" classes={{label: this.props.classes.tabLabel}} />
                </Tabs>
                {this.state.value === 0 && <DialogTabContent1 />}
                {this.state.value === 1 && <DialogTabContent2 />}
            </Dialog>    
        );
    }

}

DescriptionDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default withStyles(style)(DescriptionDialog);