import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
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
            <Fragment>
                <div id='InvoiceContainer'>
                    <div className='Top-Third'>
                        <div id='Title'>
                            <Typography variant='display1' style={{color: 'red'}}>
                                Invoice
                            </Typography>
                        </div>

                        <div id='Total'>
                            $0.00
                        </div>
                        
                        <div id='Client-Address'>
                            <p>
                                {customerName} 
                                <br></br>
                                {customerStreet}, 
                                <br></br>
                                {customerCity}, {customerState}, 
                                <br></br>
                                {customerZip}  
                            </p>
                        </div>
                        
                    </div>
              
                    <div className='Invoice-Items'>
                        <div className='Line-Item'>
                            <div>Invoice Item</div>
                            <div>Unit</div>
                            <div>Rate/FeeType</div>
                            <div>Total</div>
                        </div>

                        <div className='Total-Info'>
                            <div>Subtotal</div>
                            <div>Total for All</div>
                            <div>Amount Due</div>
                        </div>

                    </div>


                    <p className='Dev-Address'>
                        {devName} 
                        <br></br>
                        {devStreet}, 
                        <br></br>
                        {devCity}, {devState}, 
                        <br></br>
                        {devZip}
                    </p>

                </div>
            </Fragment>      
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




// style={{justifyContent: 'left', paddingLeft: '60px', paddingTop: '60px'}} (possible title style) (display: flex was set on typography)

//{customerType === 'business' && 'registered'} (this was under customer name)