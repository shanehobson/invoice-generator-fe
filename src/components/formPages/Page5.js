import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';
import { startSetDescription } from '../../actions/contractInfo';
import DescriptionDialog from '../DescriptionDialog';
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

/* {
        description: '',
        unit: 0,
        rate: 0,
        feeType: '',
        total: 0
} */

class Page5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            error: '',
            description: this.props.description ? this.props.description : '',
            // feeType: this.props.customerInfo.USstate ? this.props.customerInfo.USstate : '',
            descriptionDialogOpen: false,
            invoiceItems: []
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

    handleDescriptionChange = e => {
        this.setState({ description: e.target.value });
    };

    handleDialogClose = () => {
        this.setState({
            descriptionDialogOpen: false
        });
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
        this.setState({ USstate: e.target.value });
    };

    addInvoiceItem = () => {
        const items = this.state.invoiceItems.slice();
        items.push({
            description: '',
            unit: 0,
            rate: 0,
            feeType: '',
            total: 0
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
        if (this.state.description) {   
            const { description } = this.state;
            this.props.startSetDescription(description);
            this.props.startChangePage('6');
        } else {
            this.setState({
                error: 'Please complete complete the form before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {

        const { classes } = this.props;
        const { description, nextButtonDisabled, invoiceItems } = this.state;

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
                <div className='TextFieldContainer'>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoFocus={true}
                        fullWidth
                        placeholder="Description"
                        onChange={this.handleDescriptionChange}
                        value={description}
                    >
                    </TextField>
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        autoFocus={true}
                        placeholder="0"
                        onChange={this.handleDescriptionChange}
                        value={description}
                    >
                    </TextField>
                    
                </div>

                <div className='TextFieldContainer'>

                 {invoiceItems.map((item, i) => 
                     <InvoiceItem key={i} item={item}></InvoiceItem>
                 )}       

                <AddCircleIcon onClick={this.addInvoiceItem} />
                <p>Add line item</p>

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
                <DescriptionDialog open={this.state.descriptionDialogOpen} onClose={this.handleDialogClose} />
            </Paper>
        );
    }
};

Page5.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetDescription: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetDescription: (description) => dispatch(startSetDescription(description))
});

const mapStateToProps = (state) => ({
    description: state.contractInfo.description,
    FeeTypes: state.FeeTypes,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page5));


