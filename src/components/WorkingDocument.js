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

       
    }

  

    // generatePdf = () => {
    //     const element = this.myRef.current;
    //     var HTML_Width = element.style.width;
    //     var HTML_Height = element.style.height;
    //     var top_left_margin = 15;
    //     var PDF_Width = HTML_Width + (top_left_margin * 2);
    //     var PDF_Height = (PDF_Width * 1.5) + (top_left_margin * 2);
    //     var canvas_image_width = HTML_Width;
    //     var canvas_image_height = HTML_Height;

    //     var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    //     html2canvas(element).then(function (canvas) {
    //         var imgData = canvas.toDataURL("image/jpeg", 1.0);
    //         var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
    //         pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
    //         for (var i = 1; i <= totalPDFPages; i++) {
    //             pdf.addPage(PDF_Width, PDF_Height);
    //             pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
    //         }
    //         pdf.save("Your_PDF_Name.pdf");
    //         // $(".WorkingDoc").hide();
    //     });
    // }

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
            <div className="WorkingDoc" >
                <Paper>
                    <div>
                        <Contract generatePdf={this.props.generatePdf} />
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
    generatePdf: PropTypes.number.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired,
    startSetFormsAreComplete: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.invoiceInfo.devType,
    customerType: state.invoiceInfo.customerType,
    devInfo: state.invoiceInfo.devInfo,
    customerInfo: state.invoiceInfo.customerInfo,
    generatePdf: state.pages.pdfTrack
});

const mapDispatchToProps = (dispatch) => ({
    startSetFormsAreComplete: (formsAreComplete) => dispatch(startSetFormsAreComplete(formsAreComplete))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(WorkingDocument));


{/* <Paper classes={{root: this.props.classes.root}} elevation={1}> */ }