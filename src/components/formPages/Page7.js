import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';
import { startSetPaymentTerms } from '../../actions/contractInfo';
import PaymentTermsDialog from '../PaymentTermsDialog';

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

class Page7 extends Component {
    constructor(props) {
        console.log('Entered 7 constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            paymentTerms: this.props.paymentTerms ? this.props.paymentTerms : '',
            paymentTermsDialogOpen: false
        };
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    handleOpen = () => {
        this.setState({ open: true });
    };

    handlePaymentTermsChange = e => {
        this.setState({ paymentTerms: e.target.value });
    };

    handleLinkClicked = () => {
        this.setState({ paymentTermsDialogOpen: true });
    };

    handleDialogClose = () => {
        this.setState({
            paymentTermsDialogOpen: false
        });
    };

    handlePreviousPageButtonClick = () => {
            this.props.startChangePage('6');
            window.scrollTo(0, 0);
    };

    handleNextPageButtonClick = () => {
        if (this.state.paymentTerms) {   
            const { paymentTerms } = this.state;
            this.props.startSetPaymentTerms(paymentTerms);
            if (this.props.devType === 'business') {
                this.props.startChangePage('8A');
            } else if (this.props.customerType === 'business') {
                this.props.startChangePage('8B');
            } else {
                this.props.startChangePage('9');
            }
        } else {
            this.setState({
                error: 'Please complete complete the form before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes } = this.props;
        const { paymentTerms, nextButtonDisabled } = this.state;

        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='AltFormContainer'>       
                    <div className='FormHeaderContainer'>
                        <Typography variant='title'>
                            Payment Terms
                        </Typography>
                    </div>
                    <div className='FormHeaderContainer'>
                        <Typography variant='subheading'>
                            Please provide the Payment Terms for the contract.
                            <span
                            style={{ color: 'purple', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={this.handleLinkClicked}
                            > Click here </span> to see some example Payment Terms if you are unsure what to include.
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
                <div className='TextFieldContainer'>
                    <TextField 
                        autoFocus={true}
                        multiline
                        rows={15}
                        fullWidth
                        placeholder="Enter Payment Terms..."
                        onChange={this.handlePaymentTermsChange}
                        value={paymentTerms}
                    >
                    </TextField>
                </div>
                <div className='AltFormContainer'>
                    <div className='PageBottomDiv'>
                        <Button
                            variant="contained"
                            color="primary"
                            size='medium'
                            className={classes.button}
                            onClick={this.handlePreviousPageButtonClick}
                            >
                            <p className='ButtonText'>Previous</p>
                        </Button>  
                        <Button
                            variant="contained"
                            color="primary"
                            size='medium'
                            disabled={false}
                            className={classes.button}
                            onClick={this.handleNextPageButtonClick}
                            >
                            <p className='ButtonText'>Next</p>
                        </Button>  
                    </div>
                </div>
                <PaymentTermsDialog open={this.state.paymentTermsDialogOpen} onClose={this.handleDialogClose} />
            </Paper>
        );
    }
};

Page7.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetPaymentTerms: PropTypes.func.isRequired,
    paymentTerms: PropTypes.string.isRequired,
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetPaymentTerms: (paymentTerms) => dispatch(startSetPaymentTerms(paymentTerms))
});

const mapStateToProps = (state) => ({
    paymentTerms: state.contractInfo.paymentTerms,
    devType: state.contractInfo.devType,
    customerType: state.contractInfo.customerType
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page7));


