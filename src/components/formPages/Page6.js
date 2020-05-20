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
import { startSetSpecs } from '../../actions/contractInfo';

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

class Page6 extends Component {
    constructor(props) {
        console.log('Entered 6 constructor');
        super(props);

        this.state = {
            open: false,
            error: '',
            specs: this.props.specs ? this.props.specs : ''
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

    handleSpecsChange = e => {
        this.setState({ specs: e.target.value });
    };

    handlePreviousPageButtonClick = () => {
            this.props.startChangePage('5');
            window.scrollTo(0, 0);
    };

    handleNextPageButtonClick = () => {
        if (this.state.specs) {   
            const { specs } = this.state;
            this.props.startSetSpecs(specs);
            this.props.startChangePage('7');
        } else {
            this.setState({
                error: 'Please complete complete the form before proceeding.'
            })
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes } = this.props;
        const { specs, nextButtonDisabled } = this.state;

        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <div className='AltFormContainer'>       
                    <div className='FormHeaderContainer'>
                        <Typography variant='title'>
                            Project Specifications
                        </Typography>
                    </div>
                    <div className='FormHeaderContainer'>
                        <Typography variant='subheading'>
                            Please provide the Project Specifications for your web development project.
                            The Project Specifications will be the criteria used to determine when the project has been successfully completed. 
                            <br /><br />
                            <a
                                href='https://www.popwebdesign.net/popart_blog/en/2015/02/10-key-items-on-how-to-write-a-website-specification/'
                                target='blank'
                                style={{ color: 'purple', cursor: 'pointer', fontWeight: 'bold' }}
                            > 
                            Click here</a> for some guidance on writing project specifications.
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
                        placeholder="Enter your Project Specifications..."
                        onChange={this.handleSpecsChange}
                        value={specs}
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
            </Paper>
        );
    }
};

Page6.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetSpecs: PropTypes.func.isRequired,
    specs: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetSpecs: (specs) => dispatch(startSetSpecs(specs))
});

const mapStateToProps = (state) => ({
    specs: state.contractInfo.specs
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page6));


