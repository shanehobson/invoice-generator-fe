import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
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
            description: '',
            unit: 0,
            rate: 0,
            feeType: '',
            total: 0
        };
    };

    componentDidMount() { 
        this.setState({ 
            description: this.props.item.description,
            unit: this.props.item.unit,
            rate: this.props.item.rate,
            feeType: this.props.item.feeType,
            total: this.props.item.total,
            FeeTypes: this.props.FeeTypes
        })
    }

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

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };
    
    render() {
        const { classes, FeeTypes } = this.props;
        const { description, unit, rate, feeType, total } = this.state;

        return (
            <div className='TextFieldContainer'>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                        value={description}
                    >
                    </TextField>

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="$0.00"
                        onChange={this.handleRateChange}
                        value={rate}
                    >
                    </TextField>

                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        placeholder="total"
                        value={total}
                    >
                    </TextField>
             
                    <Select
                        open={this.state.open}
                        onChange={this.handleFeeTypeChange}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={feeType ? FeeTypes.FeeTypes.find(type => type === feeType): ''}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'feeType',
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


export default (withStyles(styles)(InvoiceItem));
