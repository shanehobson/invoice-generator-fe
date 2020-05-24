import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
    },
    PageFormInput: {
        margin: 20
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class InvoiceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            error: '',
            description: '',
            unit: 0,
            rate: 0,
            feeType: '',
            total: 0
        };
    };

    // componentDidMount()

    handleFeeTypeChange = e => {
        this.setState({ feeType: e.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    render() {
        const { classes, FeeTypes } = this.props;
        const { feeType } = this.state;

        return (
           <div>
           <Select
                open={this.state.open}
                onChange={this.handleFeeTypeChange}
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                value={feeType ? FeeTypes.find(type => feeType === type) : ''}
                onChange={this.handleChange}
                inputProps={{
                    name: 'FeeType',
                    id: 'controlled-open-select',
                }}
            >
                {
                    FeeTypes.FeeTypes.map((feeType, i) => (
                        <MenuItem key={i} value={feeType}>{feeType}</MenuItem>
                    ))
                }
            </Select>
           </div>
        );
    }
};

InvoiceItem.propTypes = {
    FeeTypes: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
    FeeTypes: state.FeeTypes,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InvoiceItem));
