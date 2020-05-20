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
import { startSetDescription } from '../../actions/contractInfo';
import DescriptionDialog from '../DescriptionDialog';

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
        console.log('Entered 5 constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            description: this.props.description ? this.props.description : '',
            descriptionDialogOpen: false
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

    handleLinkClicked = () => {
        this.setState({ descriptionDialogOpen: true });
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
        const { description, nextButtonDisabled } = this.state;

        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='AltFormContainer'>       
                    <div className='FormHeaderContainer'>
                        <Typography variant='title'>
                            Description of Services
                        </Typography>
                    </div>
                    <div className='FormHeaderContainer'>
                        <Typography variant='subheading'>
                            Please provide a description of the services you will provide.
                            This description will be the official Project Description for the contract.
                            <br />
                            <br />
                            <span
                                style={{ color: 'purple', cursor: 'pointer', fontWeight: 'bold' }}
                                onClick={this.handleLinkClicked}
                            >
                            Click here </span> to see some example Project Descriptions if you are unsure what to include.
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
                        placeholder="Enter your Project Description..."
                        onChange={this.handleDescriptionChange}
                        value={description}
                    >
                    </TextField>
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
    description: state.contractInfo.description
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page5));


