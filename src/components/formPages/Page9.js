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

class Page9 extends Component {
    constructor(props) {
        console.log('Entered 9 constructor');
        super(props);
    };

    handlePreviousPageButtonClick = () => {
        if (this.props.customerType === 'business') {
            this.props.startChangePage('5');
        } else if (this.props.devType === 'business') {
            this.props.startChangePage('5');
        } else {
            this.props.startChangePage('5');
        }
        window.scrollTo(0, 0);
    };

    render() {
        const { classes, formsAreComplete } = this.props;
        return (
            <Paper classes={{root: this.props.classes.root}} elevation={1}>
                <div className='Page1TopDiv'>
                    <Typography variant='title'>
                        {
                            formsAreComplete ?
                                'Congratulations, your contract is ready for your review! Please take a moment to review the document to make sure all the information is correct. If you need to edit any of the information you entered, click the button below to navigate to the information you wish to edit. Once you are sure that the information in the contraft is correct, click the "Generate PDF" button to download a PDF of your contract.'
                            :
                                'Some information is missing. Please go back and complete all form fields so we can generate your Web Development Services Agreement.'
                        }
                    </Typography>
                </div>
                <div className='PageBottomDiv'>
                <Button
                    variant="contained"
                    color="primary"
                    size='large'
                    className={classes.button}
                    onClick={this.handlePreviousPageButtonClick}
                    >
                    <p className='ButtonText'>Go Back</p>
              </Button>   
                </div>             
            </Paper>
        );
    }
};

Page9.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    formsAreComplete: PropTypes.bool.isRequired,
    customerType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    formsAreComplete: state.invoiceInfo.formsAreComplete,
    customerType: state.invoiceInfo.customerType
});

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Page9));

