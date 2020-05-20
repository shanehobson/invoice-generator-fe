import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';
import { startSetSigInfoCustomer } from '../../actions/contractInfo';

const styles = theme => ({
    root: {
        minHeight: 720,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing.unit * 2,
    },
    PageFormInput: {
        margin: 20
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Page8B extends Component {
    constructor(props) {
        console.log('Entered 8B constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            sigName: this.props.sigInfoCustomer.sigName ? this.props.sigInfoCustomer.sigName : '',
            sigTitle: this.props.sigInfoCustomer.sigTitle ? this.props.sigInfoCustomer.sigTitle : ''
          };
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

    handleSigNameChange = e => {
        this.setState({ sigName: e.target.value });
    };

    handleSigTitleChange = e => {
        this.setState({ sigTitle: e.target.value });
    };

    handlePreviousPageButtonClick = () => {
        if (this.props.devType === 'business') {
            this.props.startChangePage('8A');
        } else {
            this.props.startChangePage('7');
        }
        window.scrollTo(0, 0);
    };

    handleNextPageButtonClick = () => {
        if (this.state.sigName &&
            this.state.sigTitle) {   
                const { sigName, sigTitle } = this.state;
                this.props.startSetSigInfo({ sigName, sigTitle });
                this.props.startChangePage('9');
        } else {
            this.setState({
                error: 'Please complete all form fields before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, customerBusinessName } = this.props;
        const { sigName, sigTitle, nextButtonDisabled, error } = this.state;
        
        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='FormHeaderContainer'>
                    <Typography variant='title'>
                        Customer Information
                    </Typography>
                </div>
                <div className='FormHeaderContainer'>
                    <Typography variant='subheading'>
                        Please enter the full name and title of the person who will be signing the contract on behalf of {customerBusinessName}.
                    </Typography>
                </div>
                    {
                        error && (
                            <div className='FormHeaderContainer'>
                                <Typography variant='subheading' style={{ color: 'red'}}>
                                {error}
                                </Typography>
                            </div>
                        )
                    }
                <div>
                    <div className='FormInputContainer'>
                        <Input
                            autoFocus={true}
                            placeholder={'Full Name'}
                            onChange={this.handleSigNameChange}
                            value={sigName}
                        >
                        </Input>
                    </div>
                    <div className='FormInputContainer'>
                        <Input
                            placeholder="Title"
                            onChange={this.handleSigTitleChange}
                            value={sigTitle}
                        >
                        </Input>
                    </div>
                </div>
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
            </Paper>
        );
    }
};

Page8B.propTypes = {
    startChangePage: PropTypes.func.isRequired,
    startSetSigInfo: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    customerBusinessName: PropTypes.string.isRequired,
    sigInfoCustomer: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetSigInfo: (sigInfo) => dispatch(startSetSigInfoCustomer(sigInfo))
});

const mapStateToProps = (state) => ({
    customerType: state.contractInfo.customerType,
    devType: state.contractInfo.devType,
    sigInfoCustomer: state.contractInfo.sigInfoCustomer,
    customerBusinessName: state.contractInfo.customerInfo.name
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page8B));