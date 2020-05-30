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

const options = {
    style: "currency",
    currency: "USD"
  }

class InvoiceItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            description: '',
            unit: '0',
            rate: '0',
            feeType: '',
            total: 0,
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

    handleFeeTypeChange = e => {
        this.setState({ feeType: e.target.value });
        this.calculateTotal();
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };

    handleRateChange = e => {
        const rate = e.target.value || '0';
        this.setState({ rate });
        this.calculateTotal();
    };

    handleUnitChange = e => {
        const unit = e.target.value;
        this.setState({ unit });
        this.calculateTotal();
    };

    calculateTotal = () => {
        let { unit = '0', rate = '0', feeType } = this.state;
        let total = 0;
        unit = this.stringToNumber(unit);
        rate = this.stringToNumber(rate);

        console.log(unit);
        console.log('rate in calc total function: ' + rate);

        if (feeType === 'Flat fee') {
            total = Math.round(rate, 2);
        } else {
            total = Math.round(unit * rate, 2);
        }

        console.log('total: ' + total)
        this.setState(() => ({ total }));
    }

    stringToNumber(str) {
        if (!str) return 0;
        if (typeof str === 'number') return str;

        const arr = str.split('');
        console.log(arr);
        const filteredArr = arr.filter(char => {
            const nums = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
            const isNumber = nums.indexOf(char) > - 1;
            const isPeriod = char === '.';
            if (isNumber || isPeriod) {
                return true;
            } else {
                return false;
            }
        });
        // '$770.75' -> '770.75'
        const isDecimal = filteredArr.indexOf('.') > -1;
        const joined = filteredArr.join('');
        console.log(joined);
        if (!isDecimal) {
            return parseInt(joined);
        } else {
            // '770.75' 
            // joined.split('.') -> ['770', '75']
            const dollars = joined.split('.')[0];
            const cents = joined.split('.')[1] || 0;
            return parseInt(dollars, 10) + parseInt(cents / 100, 10);
        }
    }

    handleRateKeyPress = (event) => {
        if (event.key === 'Enter'){
           this.convertRateToCurrency();
        }
    }

    handleRateBlur = () => {
        this.convertRateToCurrency();
    }

    convertRateToCurrency = () => {
        const rate = this.state.rate;
        console.log(rate);
        const convertedRate = this.stringToNumber(rate).toLocaleString("en-US", options);
        console.log(convertedRate);
        this.setState({
            rate: convertedRate
        });
    }

    handleRateFocus = () => {
        if (!this.state.rate) {
            return;
        }
        const rateString = this.state.rate || '0'; // $.
        const arr = rateString.split(''); // turn to array of every character
        const filteredArr = arr.filter(char => {
            const nums = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];
            const isNumber = nums.indexOf(char) > - 1;
            const isPeriod = char === '.';
            if (isNumber || isPeriod) {
                return true;
            } else {
                return false;
            }
        });
        const rate = parseInt(filteredArr.join(''), 10);
        this.setState({
            rate
        });
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
                            style={{width: '50px'}}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Unit"
                            onChange={this.handleUnitChange}
                            value={unit}
                        >
                        </TextField>}
                    
                        <TextField
                            style={{ width: '50px'}}
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            placeholder="Rate"
                            onChange={this.handleRateChange}
                            onKeyPress={this.handleRateKeyPress}
                            onFocus={this.handleRateFocus}
                            onBlur={this.handleRateBlur}
                            value={rate}
                            >
                        </TextField>

                        <Select
                            style={{ width: feeType === 'Flat fee' ? '160px' : '120px'}}
                            fullWidth
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

                        <p style={{ width: '40px'}} className='InvoiceItemTotal'>
                            {feeType === 'Flat fee' ? 
                            this.stringToNumber(rate).toLocaleString("en-US", options): 
                            this.stringToNumber(rate * unit).toLocaleString("en-US", options)}
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
