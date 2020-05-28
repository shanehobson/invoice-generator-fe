import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Contract extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { 
            devType,
            customerType, 
            devInfo,
            customerInfo
        } = this.props;

        const devName = devInfo.name === '' ? '___________________' : devInfo.name;
        const devStreet = devInfo.street === '' ? '____________________' : devInfo.street;
        const devCity = devInfo.city === '' ? '____________________' : devInfo.city;
        const devState = devInfo.USstate === '' ? '__________' : devInfo.USstate;
        const devZip = devInfo.zip === '' ? '_____' : devInfo.zip;
        const customerName = customerInfo.name === '' ? '___________________' : customerInfo.name;
        const customerStreet = customerInfo.street === '' ? '____________________' : customerInfo.street;
        const customerCity = customerInfo.city === '' ? '____________________' : customerInfo.city;
        const customerState = customerInfo.USstate === '' ? '__________' : customerInfo.USstate;
        const customerZip = customerInfo.zip === '' ? '_____' : customerInfo.zip;

        return (
            <div id='workingDocContainer'>
                <div id='Contract-ContractTitleContainer'>
                </div>
                <p>
                    {devName} <br></br>{devStreet}, <br></br>{devCity}, {devState}, <br></br>{devZip}
                </p>
                <p>
                    {customerName}, whose {customerType === 'business' && 'registered'}{customerStreet}, {customerCity}, {customerState}, {customerZip}  
                </p>
                {/* <h4>II.  DESCRIPTION OF SERVICES AND SCOPE OF WORK</h4>
                <p>
                Developer shall render the web development and design services set forth in <strong>Schedule A (Description of Services)</strong>,
                as per the specifications set forth in <strong>Schedule B (Project Specifications)</strong>.
                The product of the web development and design services provided by Developer shall be referred to herein as the <strong>Project</strong>.
                </p> */}

                {/* <section>
                    <h4>XVII.  SIGNATORIES</h4>
                    <p>
                    This Agreement shall be signed by {devRepresentative} {devType === 'business' && `on behalf of ${devName}`} (<strong>Developer</strong>), and {customerRepresentative} {customerType === 'business' && `on behalf of ${customerName}`} (<strong>Customer</strong>). This Agreement is effective as of the first date written above.
                    </p>
                    <br />
                    <p><strong>Developer:</strong></p>
                    <p>By: ______________________________________________</p>
                    <blockquote>{devRepresentative}</blockquote>
                    <blockquote>{devTitle}</blockquote>
                    <br />
                    <p><strong>Customer:</strong></p>
                    <p>By: ______________________________________________</p>
                    <blockquote>{customerRepresentative}</blockquote>
                    <blockquote>{customerTitle}</blockquote>
                </section>
                <section>
                    <h4>SCHEDULE A - Description of Services</h4>
                    <p>{description}</p>
                </section>
                <section>
                    <h4>SCHEDULE B - Project Specifications</h4>
                    <p>{specs}</p>
                </section>
                <section>
                    <h4>SCHEDULE C - Payment Terms</h4>
                    <p>{paymentTerms}</p>
                </section> */}
            </div>
        );
    }
};

Contract.propTypes = {
    devType: PropTypes.string.isRequired,
    customerType: PropTypes.string.isRequired,
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    devType: state.invoiceInfo.devType,
    customerType: state.invoiceInfo.customerType,
    devInfo: state.invoiceInfo.devInfo,
    customerInfo: state.invoiceInfo.customerInfo
});


export default connect(mapStateToProps)(Contract);

