import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';
import { startSetDevType } from '../../actions/contractInfo';

const styles = theme => ({
    root: {
        minHeight: 720,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Page2 extends Component {
    constructor(props) {
        console.log('Entered 2 constructor');
        super(props);

        this.state = {
            error: false,
            devType: '',
            nextButtonDisabled: true
        }
    };

    handleDevTypeChangeIndividual = () => {
        this.setState(() => ({ 
            devType: 'individual',
            nextButtonDisabled: false
        }));
    };

    handleDevTypeChangeBusiness = () => {
        this.setState(() => ({ 
            devType: 'business',
            nextButtonDisabled: false
        }));
    };

    handlePreviousPageButtonClick = () => {
        window.scrollTo(0, 0);
        this.props.startChangePage('1');
    };

    handleNextPageButtonClick = () => {
        if (this.state.devType === 'individual') {
            this.props.startChangePage('3A');
        } else {
            this.props.startChangePage('3B');
        }
        this.props.startSetDevType(this.state.devType);
        window.scrollTo(0, 0);
    };

    render() {
        const { error, devType, nextButtonDisabled } = this.state;
        const { classes } = this.props;
        return (
            <Paper classes={{root: classes.root}} elevation={1}>
                <FormControl error={error} component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">
                        <Typography>
                        Are you performing web development services as an individual or as a registered business entity?
                        </Typography>
                    </FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox checked={devType==='individual'} onChange={this.handleDevTypeChangeIndividual} value="individual" />
                            }
                            label="Individual"
                        />
                        <FormControlLabel
                            control={
                            <Checkbox checked={devType==='business'} onChange={this.handleDevTypeChangeBusiness} value="business" />
                            }
                            label="Business"
                        />
                    </FormGroup>
                </FormControl>
               
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
                        disabled={nextButtonDisabled}
                        className={classes.button}
                        onClick={this.handleNextPageButtonClick}
                        >
                        <p className='ButtonText'>Next</p>
                    </Button>  
                </div>
            </Paper>
        );
    }
}

Page2.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    startSetDevType: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    startSetDevType: (devType) => dispatch(startSetDevType(devType))
});

const mapStateToProps = (state) => ({
    devType: state.contractInfo.devType
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Page2));
