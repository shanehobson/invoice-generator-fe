import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { startChangePage, generatePdf  } from '../../actions/pages';

const style = theme => ({
    root: {
        minHeight: 500
    },
    button: {
        margin: theme.spacing.unit
    }
});

class Page9 extends Component {
    constructor(props) {
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

    generatePdf = () => {
        this.props.generatePdf();
    }

    render() {
        const { classes, formsAreComplete } = this.props;
        return (
            <Paper classes={{root: this.props.classes.root}} elevation={1}>
                <div className='Page1TopDiv'>
                    <Typography variant='title'>
                        {
                            formsAreComplete ?
                                'Congratulations! Your invoice is ready for your review. Please take a moment to review your invoice to make sure all the information is correct. If you need to edit any of the information you entered, click the "Previous" button below to navigate to the information you wish to edit. Once you are sure that the information in the invoice is correct, click the "Generate PDF" button to download a PDF of your invoice.'
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
                        <p className='ButtonText'>Previous</p>
                    </Button>
                <div> 
                    <Button
                        variant="contained"
                        color="primary"
                        size='medium'
                        className={classes.button}
                        onClick={this.generatePdf}
                    >
                        <p className='ButtonText'>Generate PDF</p>
                    </Button> 
                </div> 
                </div>             
            </Paper>
        );
    }
};

Page9.propTypes = {
    classes: PropTypes.object.isRequired,
    startChangePage: PropTypes.func.isRequired,
    generatePdf: PropTypes.func.isRequired,
    formsAreComplete: PropTypes.bool.isRequired,
    customerType: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
    formsAreComplete: state.invoiceInfo.formsAreComplete,
    customerType: state.invoiceInfo.customerType
});

const mapDispatchToProps = (dispatch) => ({
    startChangePage: (pageNumber) => dispatch(startChangePage(pageNumber)),
    generatePdf: () => dispatch(generatePdf())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Page9));

