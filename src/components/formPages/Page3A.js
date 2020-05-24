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
import { startSetDevInfo } from '../../actions/contractInfo';

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

class Page3A extends Component {
    constructor(props) {
        console.log('Entered 3A constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            name: this.props.devInfo.name ? this.props.devInfo.name : '',
            street: this.props.devInfo.street ? this.props.devInfo.street : '',
            city: this.props.devInfo.city ? this.props.devInfo.city : '',
            USstate: this.props.devInfo.USstate ? this.props.devInfo.USstate : '',
            zip: this.props.devInfo.zip ? this.props.devInfo.zip : '',
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

    handleNameChange = e => {
        this.setState({ name: e.target.value });
    };

    handleStreetChange = e => {
        this.setState({ street: e.target.value });
    };

    handleCityChange = e => {
        this.setState({ city: e.target.value });
    };

    handleUSstateChange = e => {
        this.setState({ USstate: e.target.value });
    };

    handleZipChange = e => {
        this.setState({ zip: e.target.value });
    };

    handlePreviousPageButtonClick = () => {
        this.props.startChangePage('2');
        window.scrollTo(0, 0);
    };

    handleNextPageButtonClick = () => {
        if (this.state.name &&
            this.state.street &&
            this.state.city &&
            this.state.USstate &&
            this.state.zip) {   
            const { name, street, city, USstate, zip } = this.state;
            this.props.startSetDevInfo({
                name, street, city, USstate, zip
            });
            this.props.startChangePage('4');
        } else {
            this.setState({
                error: 'Please complete all form fields before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, USstates } = this.props;
        const { name, street, city, USstate, zip, nextButtonDisabled, error } = this.state;
        console.log(USstate);

        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='FormHeaderContainer'>
                    <Typography variant='title'>
                        Developer Information
                    </Typography>
                </div>
                <div className='FormHeaderContainer'>
                    <Typography variant='subheading'>
                        Please enter the following information about you, the Developer. This will be your official name and address for the invoice.
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
                                onChange={this.handleNameChange}
                                value={name}
                            >
                            </Input>
                        </div>
                        <div className='FormInputContainer'>
                            <Input
                                placeholder="Street Address"
                                onChange={this.handleStreetChange}
                                value={street}
                            >
                            </Input>
                        </div>
                        <div className='FormInputContainer'>
                            <Input
                                placeholder="City"
                                onChange={this.handleCityChange}
                                value={city}
                            >
                            </Input>
                        </div>
                        <div className='FormInputContainer'>
                            <div>
                                <InputLabel htmlFor="demo-controlled-open-select"><p style={{color: '#aaa'}}>State</p></InputLabel>
                                <p> </p>
                                <Select
                                    open={this.state.open}
                                    onChange={this.handleUSstateChange}
                                    onClose={this.handleClose}
                                    onOpen={this.handleOpen}
                                    value={USstate ? USstates.USstates.find(stateElement => stateElement.name === USstate).name : ''}
                                    onChange={this.handleChange}
                                    inputProps={{
                                    name: 'USstate',
                                    id: 'controlled-open-select',
                                    }}
                                >
                                {
                                    USstates.USstates.map(USstate => (
                                        <MenuItem key={USstate.name} value={USstate.name}>{USstate.name}</MenuItem>
                                    ))
                                
                                }
                                </Select>
                            </div>
                        </div>
                        <div className='FormInputContainer'>
                            <Input
                                placeholder="Zip Code"
                                onChange={this.handleZipChange}
                                value={zip}
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

Page3A.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetDevInfo: PropTypes.func.isRequired,
    USstates: PropTypes.object.isRequired,
    devInfo: PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetDevInfo: (devInfo) => dispatch(startSetDevInfo(devInfo))
});

const mapStateToProps = (state) => ({
    USstates: state.USstates,
    devInfo: state.contractInfo.devInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page3A));