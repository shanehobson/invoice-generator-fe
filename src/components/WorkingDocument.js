import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { generate } from '../documents/contract';
import Contract from './Contract';
import { startSetFormsAreComplete } from '../actions/invoiceInfo';

const styles = theme => ({
    root: {
        height: 720,
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
                customerInfo
            } = this.props;

        let result = true; // todo: check if all required fields have been filled out here.

        this.props.startSetFormsAreComplete(result);
        return result;
    }

    render() {
        const { formsAreComplete, textColor } = this.state;
        const { classes } = this.props;

        return (
            <div className="WorkingDoc">
                <Paper>
                    <div>
                        <Contract />
                    </div>
                </Paper>
            </div>     
        );
    }
};

WorkingDocument.propTypes = {
    classes: PropTypes.object.isRequired,
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired,
    startSetFormsAreComplete: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.invoiceInfo.devType,
    customerType: state.invoiceInfo.customerType,
    devInfo: state.invoiceInfo.devInfo,
    customerInfo: state.invoiceInfo.customerInfo
});

const mapDispatchToProps = (dispatch) => ({
    startSetFormsAreComplete: (formsAreComplete) => dispatch(startSetFormsAreComplete(formsAreComplete))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkingDocument));


{/* <Paper classes={{root: this.props.classes.root}} elevation={1}> */}