import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceInfo: {
                devInfo: {
                    name: '',
                    street: '',
                    city: '',
                    USstate: '',
                    zip: ''
                },
                customerInfo: {
                    name: '',
                    street: '',
                    city: '',
                    USstate: '',
                    zip: ''
                },
                invoiceItems: []
            }
        };
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            invoiceInfo: nextProps.invoiceInfo
        });
    };

    render() {
        console.log('rendering contract component')
        const { invoiceInfo } = this.state;
        const { devInfo, customerInfo, invoiceItems } = invoiceInfo;      
        
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
                                {customerStreet}
                                <br></br>
                                {customerCity}, {customerState}
                                <br></br>
                                {customerZip}
                            </div>   
                        </div>
                        
                    </div>
              
                    <div className='Middle-Third-Container'>
                        {invoiceItems.map((item, i) => {
                        console.log(item)
                        return (
                            <div key={i} className='Line-Items'>
                                <div id='Item'>{item.description}</div>
                                <div id='Unit'>{item.unit}</div>
                                <div id='Rate'>
                                    {item.feeType === 'Flat fee' && item.rate }
                                    {item.feeType !== 'Flat fee' && item.rate + '/' + item.feeType }
                                    </div>
                                <div id='Item-Total'>{item.total}</div>
                            </div>
                        
                        )})}
                       
                        <div className='Total-Info'>
                            <div id='Subtotal'>Subtotal</div>
                            <div id='Subtotal-Price'>$0.00</div>
                            <div id='Total'>Total</div>
                            <div id='Total-Price'>$0.00</div>
                            <div id='Amount-Due'>Amount Due</div>
                            <div id='Amount-Price'>$0.00</div>
                        </div>
                    </div>

                    <div className='Bottom-Third-Container'>
                        <h4 className='Client-Customer'>{devName}</h4> 
                        {devStreet}
                        <br></br>
                        {devCity}, {devState}
                        <br></br>
                        {devZip}
                    </div>

                </div>
            </Fragment>      
        );
    }
};

Contract.propTypes = {
    invoiceInfo: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    invoiceInfo: state.invoiceInfo
});

export default connect(mapStateToProps)(Contract);