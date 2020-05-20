import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { generate } from '../documents/contract';
import Contract from './Contract';
import { startSetFormsAreComplete } from '../actions/contractInfo';


const styles = theme => ({
    root: {
        height: 720,
        marginLeft: 10
    },
    docContainer: {
        height: 720,
        overflow: 'scroll'
    },
    button: {
        margin: theme.spacing.unit
    }
});

class WorkingDocument extends Component {
    constructor(props) {
        console.log('Entered WorkingDocument constructor')
        super(props);
        this.state = {
            formsAreComplete: false,
            textColor: '#aaa'
        }
    };

    componentDidMount() {
        this.setState({
            formsAreComplete: this.formsAreComplete(),
            textColor: this.formsAreComplete() ? '#000' : '#aaa'
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            formsAreComplete: this.formsAreComplete(),
            textColor: this.formsAreComplete() ? '#000' : '#aaa'
        });
    };

    generatePDF = () => {
        generate(document.getElementById('workingDocContainer'));
    };

    formsAreComplete = () => {
        const { devType,
                customerType, 
                devInfo,
                customerInfo,
                description,
                specs,
                paymentTerms,
                sigInfoDev,
                sigInfoCustomer
            } = this.props;

        let result;

        if (devType === 'business' && customerType === 'individual') {
            result = (
                sigInfoDev.name !== '' &&
                description !== '' &&
                specs !== '' &&
                paymentTerms !== ''
            );            
        } else if (customerType === 'business') {
            result = (
                sigInfoCustomer.name !== '' &&
                description !== '' &&
                specs !== '' &&
                paymentTerms !== ''
            );
        } else {
            result = !(
                description === '' &&
                specs === '' &&
                paymentTerms === ''
            );
        }
        
        this.props.startSetFormsAreComplete(result);
        console.log(paymentTerms);
        return result;
    }

    render() {
        const { formsAreComplete, textColor } = this.state;
        const { classes } = this.props;

        return (
            <Paper classes={{root: this.props.classes.root}} elevation={1}>
                {   formsAreComplete ? 
                        <div className='WorkingDoc-buttonContainer'> 
                            <Button
                                variant="contained"
                                color="primary"
                                size='medium'
                                className={classes.button}
                                onClick={this.generatePDF}
                                >
                                <p className='ButtonText'>Generate PDF</p>
                            </Button> 
                        </div> 
                        :
                        <div className='WorkingDoc-buttonContainer'>
                            <Typography variant='display3' style={{color: 'red'}}>
                                DRAFT
                            </Typography>
                        </div>
                }
                <div className='Contract-contractContainer' style={{color: `${textColor}`}}>
                    <Contract />
                </div>
            </Paper>
        );
    }
};

WorkingDocument.propTypes = {
    classes: PropTypes.object.isRequired,
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    specs: PropTypes.string.isRequired,
    paymentTerms: PropTypes.string.isRequired,
    sigInfoDev: PropTypes.object.isRequired,
    sigInfoCustomer: PropTypes.object.isRequired,
    startSetFormsAreComplete: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.contractInfo.devType,
    customerType: state.contractInfo.customerType,
    devInfo: state.contractInfo.devInfo,
    customerInfo: state.contractInfo.customerInfo,
    description: state.contractInfo.description,
    specs: state.contractInfo.specs,
    paymentTerms: state.contractInfo.paymentTerms,
    sigInfoDev: state.contractInfo.sigInfoDev,
    sigInfoCustomer: state.contractInfo.sigInfoCustomer
});

const mapDispatchToProps = (dispatch) => ({
    startSetFormsAreComplete: (formsAreComplete) => dispatch(startSetFormsAreComplete(formsAreComplete))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkingDocument));
