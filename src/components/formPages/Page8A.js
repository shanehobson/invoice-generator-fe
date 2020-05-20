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
import { startSetSigInfoDev } from '../../actions/contractInfo';

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

class Page8A extends Component {
    constructor(props) {
        console.log('Entered 8A constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            sigName: this.props.sigInfoDev.sigName ? this.props.sigInfoDev.sigName : '',
            sigTitle: this.props.sigInfoDev.sigTitle ? this.props.sigInfoDev.sigTitle : ''
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
        this.props.startChangePage('7');
        window.scrollTo(0, 0);
    };

    handleNextPageButtonClick = () => {
        if (this.state.sigName &&
            this.state.sigTitle) {   
                const { sigName, sigTitle } = this.state;
                this.props.startSetSigInfo({ sigName, sigTitle });
            if (this.props.customerType === 'business') {
                this.props.startChangePage('8B');
            } else {
                this.props.startChangePage('9');
            }
        } else {
            this.setState({
                error: 'Please complete all form fields before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, devBusinessName } = this.props;
        const { sigName, sigTitle, nextButtonDisabled, error } = this.state;
        
        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='FormHeaderContainer'>
                    <Typography variant='title'>
                        Developer Information
                    </Typography>
                </div>
                <div className='FormHeaderContainer'>
                    <Typography variant='subheading'>
                        Please enter the full name and title of the person who will be signing the contract on behalf of {devBusinessName}.
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

Page8A.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetSigInfo: PropTypes.func.isRequired,
    customerType: PropTypes.string.isRequired,
    devBusinessName: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetSigInfo: (sigInfo) => dispatch(startSetSigInfoDev(sigInfo))
});

const mapStateToProps = (state) => ({
    customerType: state.contractInfo.customerType,
    sigInfoDev: state.contractInfo.sigInfoDev,
    devBusinessName: state.contractInfo.devInfo.name
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page8A));