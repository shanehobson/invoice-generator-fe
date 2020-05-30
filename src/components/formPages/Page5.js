import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import AddCircleIcon from '@material-ui/icons/AddCircle';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Typography from '@material-ui/core/Typography';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';
import InvoiceItem from '../InvoiceItem';

const styles = theme => ({
    root: {
        minHeight: 720,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit
    },
    PageFormInput: {
        margin: 20
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Page5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: '',
            invoiceItems: [],
            FeeTypes: []
        };
    };


    componentDidMount() { 
        this.setState({ 
            invoiceItems: this.props.invoiceItems,
            FeeTypes: this.props.FeeTypes
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleRateChange = e => {
        this.setState({ rate: e.target.value });
    };

    handlePreviousPageButtonClick = () => {
        if (this.props.customerType === 'individual') {
            this.props.startChangePage('4A');
        } else {
            this.props.startChangePage('4B');
        }
        window.scrollTo(0, 0);
    };

    handleFeeTypeChange = e => {
        this.setState({ feeType: e.target.value });
    };

    addInvoiceItem = () => {
        const items = this.state.invoiceItems.slice();
        items.push({
            description: '',
            unit: null,
            rate: null,
            feeType: 'Flat fee',
            total: null
        })
        this.setState({
            invoiceItems: items
        })
    }

    removeInvoiceItem = (i) => {
        const items = this.state.invoiceItems.slice();
        if (items.length === 0) { return; }
        this.setState({
            invoiceItems: items.splice(i, 1)
        })
    }

    handleNextPageButtonClick = () => {
        this.props.setInvoiceItems(this.state.invoiceItems);
        this.props.startChangePage('9');
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, FeeTypes } = this.props;
        const { nextButtonDisabled, feeType, invoiceItems} = this.state;


        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='AltFormContainer'>       
                    <div className='FormHeaderContainer'>
                        <Typography variant='title'>
                            What are you invoicing?
                        </Typography>
                    </div>
                    <div>
                        {
                            this.state.error && (
                                <div className='FormHeaderContainer'>
                                    <Typography variant='subheading' style={{ color: 'red'}}>
                                    {this.state.error}
                                    </Typography>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className='AddInvoiceItemButton'>

                 {invoiceItems.map((item, i) => 
                     <InvoiceItem key={i} item={item} FeeTypes={this.state.FeeTypes}></InvoiceItem>
                 )}       

                <div className='AddInvoiceContainer'>
                    <AddCircleIcon onClick={this.addInvoiceItem} />
                    <p>Add line item</p>
                    <p>Your currency is USD now. <a href="Change currency">Change currency</a></p>
                </div>    


                </div>
      
                <div className='AltFormContainer'>
                    <div className='PageBottomDiv'>
                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                            className={classes.button}
                            onClick={this.handlePreviousPageButtonClick}
                            >
                            <p className='ButtonText'>Previous</p>
                        </Button>  
                        <Button
                            variant='contained'
                            color='primary'
                            size='medium'
                            disabled={false}
                            className={classes.button}
                            onClick={this.handleNextPageButtonClick}
                            >
                            <p className='ButtonText'>Next</p>
                        </Button>  
                    </div>
                </div>
            </Paper>
        );
    }
};

Page5.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    setInvoiceItems: (invoiceItems) => dispatch(setInvoiceItems(invoiceItems))
});

const mapStateToProps = (state) => ({
    FeeTypes: state.FeeTypes,
    invoiceItems: state.invoiceInfo.invoiceItems
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page5));


