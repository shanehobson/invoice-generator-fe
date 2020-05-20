import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage } from '../../actions/pages';

const style = theme => ({
    root: {
        minHeight: 720
    },
    button: {
        margin: theme.spacing.unit
    }
});

class Page1 extends Component {
    constructor(props) {
        console.log('Entered 1 constructor');
        super(props);
    };

    handleNextPageButtonClick = () => {
        this.props.startChangePage('2');
        window.scrollTo(0, 0);
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper classes={{root: this.props.classes.root}} elevation={1}>
                <div className='Page1TopDiv'>
                    <Typography variant='title'>
                        <span>
                        Welcome to Invoice Generator. 
                        </span>
                        <div>
                        In just a few short steps, we can help you generate an invoice for your freelance web development project. Click on the button below to get started!
                        </div>
                    </Typography>
                </div>
                <div className='PageBottomDiv'>
                    <Button
                        variant="contained"
                        color="primary"
                        size='large'
                        className={classes.button}
                        onClick={this.handleNextPageButtonClick}
                        >
                        <p className='ButtonText'>Get Started</p>
                    </Button>   
                </div>             
            </Paper>
        );
    }
};

Page1.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber))
});

export default connect(undefined, mapDispatchToProps)(withStyles(style)(Page1));

