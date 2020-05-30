import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import '../styles/LayoutStyles.css';

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
        console.log(props)

        this.state = {
            description: '',
            unit: '1',
            rate: '',
            feeType: '',
            total: '',
            errors: {
                rate: false,
                unit: false
            }
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

    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };

    handleFeeTypeChange = e => {
        const feeType = e.target.value;
        const { unit, rate } = this.state;
        const total = this.calculateTotal(unit, rate, feeType)
        this.setState({ feeType, total });
    };

    handleRateChange = e => {
        const rate = e.target.value || '';
        const { unit, feeType } = this.state;
        const total = this.calculateTotal(unit, rate, feeType);
        this.setState({ rate, total });
    };

    handleUnitChange = e => {
        const unit = e.target.value;
        const { rate, feeType } = this.state;
        const total = this.calculateTotal(unit, rate, feeType);
        this.setState({ unit, total });
    };

    calculateTotal = (unit, rate, feeType) => {
        if (!unit) {  unit = '1' }
        if (!rate) { rate = '0' }
        rate = this.stringToNumber(rate);
        return (unit * rate).toFixed(2).toString();
    }

    stringToNumber(str) {
        if (!str) return 0;
        if (typeof str === 'number') return str;

        const arr = str.split('');
        const filteredArr = arr.filter(char => {
            const nums = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
            const isNumber = nums.indexOf(char) > - 1;
            const isPeriod = char === '.';
            return isNumber || isPeriod;
        });
      
        const isDecimal = filteredArr.indexOf('.') > -1;
        const joined = filteredArr.join('');

        if (!isDecimal) {
            return parseInt(joined);
        } else {
            const dollars = joined.split('.')[0];
            const cents = joined.split('.')[1] || 0;
            return parseInt(dollars, 10) + (parseFloat(cents / 100, 10));
        }
    }

    render() {
        const { FeeTypes } = this.props;
        const { description, unit, rate, feeType, total } = this.state;
 
        return (

            <div>
                <div className='TextFieldContainer'>

                    <div  className='RemoveInvoiceButton'>
                        <HighlightOffIcon />
                    </div>

                    <TextField
                            id="outlined-basic"
                            fullWidth
                            variant="outlined"
                            placeholder="Description"
                            onChange={this.handleDescriptionChange}
                            value={description}
                        >
                    </TextField>
                    
                    <div className='SecondRowInvoice'>
                        {this.state.feeType !== 'Flat fee' &&
                        <TextField
                            style={{width: '40px'}}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Unit"
                            onChange={this.handleUnitChange}
                            value={unit}
                        >
                        </TextField>}
                    
                        <TextField
                            style={{ width: '70px'}}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Rate"
                            onChange={this.handleRateChange}
                            value={rate}
                            >
                        </TextField>

                        <Select
                            style={{ width: feeType === 'Flat fee' ? '110px' : '120px'}}
                            fullWidth
                            open={this.state.open}
                            onChange={this.handleFeeTypeChange}
                            onClose={this.handleClose}
                            onOpen={this.handleOpen}
                            value={feeType ? FeeTypes.FeeTypes.find(type => type === feeType): ''}
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

                        <p style={{ width: '40px'}} className='InvoiceItemTotal'>
                            {/* {(this.stringToNumber(rate) * unit).toLocaleString("en-US", options)} */}
                            ${total}
                        </p>
                    </div>
                </div>
            </div>
            
            
        );
    }
};

InvoiceItem.propTypes = {
    FeeTypes: PropTypes.object.isRequired
};


export default (withStyles(styles)(InvoiceItem));
