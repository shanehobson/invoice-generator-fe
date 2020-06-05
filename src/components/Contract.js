import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Contract extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { 
            devInfo,
            customerInfo,
            invoiceInfo,
        } = this.props;

        const invoiceItem = invoiceInfo.toString() === '' ? '___________________' : invoiceInfo.toString() ;
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
                <div id='Invoice-Page-Container'>
                    <div className='Top-Third-Container'>
                        <h1 id='Invoice-Title'>Invoice</h1>
                        <div className='Top-Right-Grid-Area'>
                            <h1 id='Invoice-Total'>
                                $0.00
                            </h1>
                            <div id='Due'>
                                Due:
                            </div>
                            <div id='Issued'>
                                Issued: (date)
                            </div>
                        </div>

                        <div id='Client-Address-Area'>
                            <h2 className='Client-Customer'>
                                {customerName}
                            </h2>
                            <div id='Client-Address'>
                                {customerStreet}, 
                                <br></br>
                                {customerCity}, {customerState}, 
                                <br></br>
                                {customerZip}
                            </div>   
                        </div>
                        
                    </div>
              
                    <div className='Third-Container Middle-Third-Container'>
                        <div className='Line-Items'>
                            <div id='Item'>{invoiceItem}</div>
                            <div id='Unit'>Unit</div>
                            <div id='Rate'>Rate/FeeType</div>
                            <div id='Item-Total'>Total</div>
                        </div>
                        <div className='Third-Container Total-Info'>
                            <div id='Subtotal'>Subtotal</div>
                            <div id='Subtotal-Price'>$0.00</div>
                            <div id='Total'>Total</div>
                            <div id='Total-Price'>$0.00</div>
                            <div id='Amount-Due'>Amount Due</div>
                        <div id='Amount-Price'>$0.00</div>
                    </div>
                    </div>

                    <div className='Third-Container Bottom-Third-Container'>
                        <h4 className='Client-Customer'>{devName}</h4> 
                        {devStreet}, 
                        <br></br>
                        {devCity}, {devState}, 
                        <br></br>
                        {devZip}
                    </div>

                </div>
            </Fragment>      
        );
    }
};

Contract.propTypes = {
    devInfo: PropTypes.object.isRequired,
    customerInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    devInfo: state.invoiceInfo.devInfo,
    customerInfo: state.invoiceInfo.customerInfo,
    invoiceInfo: state.invoiceInfo.invoiceItems
});


export default connect(mapStateToProps)(Contract);




// style={{justifyContent: 'left', paddingLeft: '60px', paddingTop: '60px'}} (possible title style) (display: flex was set on typography)

//{customerType === 'business' && 'registered'} (this was under customer name)