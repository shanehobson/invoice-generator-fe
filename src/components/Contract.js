import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from '../utility/debounce';
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            right: false,
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
                invoiceItems: [],
                subtotal: 0, // @todo add to redux
                taxes: 0, // @todo add to redux
                discount: 0, // @todo add to redux
                total: 0 // @todo add to redux
            },
            editIcons: {
                topThird: false,
                middleThird: false,
                bottomThird: false
            }
        };
    };

    componentWillReceiveProps(nextProps) {
        console.log('component will receive props')
        const subtotal = this.calculateSubtotal(nextProps.invoiceInfo.invoiceItems)
        console.log(subtotal);
        this.setState({
            invoiceInfo: {
                ...nextProps.invoiceInfo,
                subtotal
            }
        });
    };

    onMouseEnter = debounce((third) => {
        this.setState({
            editIcons: {
                topThird: third === 'topThird',
                middleThird: third === 'middleThird',
                bottomThird: third === 'bottomThird'
            }
        })
        // console.log('mouse enter' + third);
    }, 50)

    onMouseLeaveInvoice = debounce(() => {
        this.setState({
            editIcons: {
                topThird: false,
                middleThird: false,
                bottomThird: false
            }
        })
        // console.log('mouse exit');
    }, 50)

    onMouseEnterTopThird = () => {
        this.onMouseEnter('topThird')
    }

    onMouseEnterMiddleThird = () => {
        this.onMouseEnter('middleThird')
    }

    onMouseEnterBottomThird = () => {
        this.onMouseEnter('bottomThird')
    }

    calculateSubtotal = (invoiceItems) => {
        if (!invoiceItems || invoiceItems.length === 0) {
            return 0;
        }
        const subtotal = invoiceItems
        .map(item => parseFloat(item.total))
        .reduce((a, b) => {
            console.log(a)
            return a + b;
        });
        console.log(subtotal)
        return subtotal.toFixed(2); 
    }

    // addNewItem = () => {
        
    // }

    

    



    render() {

        const { invoiceInfo, editIcons } = this.state;
        const { devInfo, customerInfo, invoiceItems, subtotal } = invoiceInfo;      
        
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

                
                <Sidebar />
                <div id='Invoice-Page-Container'>    
                    <div className='Invoice-Settings'>  
                        <button className='Invoice-Button'>
                            <SettingsIcon style={{paddingRight: '3px', fontSize: '18px'}}/>
                            <span>
                                Invoice settings
                            </span>
                        </button>            
                    </div>
                    
                    <div onMouseLeave={this.onMouseLeaveInvoice}>
                        <div className='Top-Third-Container'
                            onMouseEnter={this.onMouseEnterTopThird}>
                            <div className="Edit-Container">
                                { editIcons.topThird &&
                                    <div className='Edit-Icon' style={{left: '100px'}}>
                                        Edit Branding
                                    </div>
                                }
                                <h1 id='Invoice-Title' className='Invoice-Branding'>Invoice</h1>
                                <p style={{fontSize: '14px', marginBottom: 0}}>#1</p>
                            </div>
                        
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
                                    {customerCity}, {customerState} {customerZip}
                                    <br></br>
                                    <br></br>
                                    <div className='Gray-Text'>+ Tax Id</div>
                                </div>   
                            </div>
                            
                        </div>
                
                        <div className='Middle-Third-Container'
                            onMouseEnter={this.onMouseEnterMiddleThird}>

                            {invoiceItems.map((item, i) => {
                            return (
                                <div key={item.description} className='Line-Items'>
                                    <div id='Item'>{item.description}</div>
                                    <div id='Unit'>{item.unit}</div>
                                    <div id='Rate'>
                                        {item.feeType === 'Flat fee' && item.rate }
                                        {item.feeType !== 'Flat fee' && item.rate + '/' + item.feeType }
                                    </div>
                                    <div id='Item-Total'>${item.total}</div>                                
                                </div>  
                            )})}

                            <div className='Total-Info'>
                                <div id='Subtotal'>Subtotal</div>
                                <div id='Subtotal-Price'>${subtotal}</div>
                                <div id='Taxes'>+ Taxes</div>
                                <div id='Discount'>+ Discount</div>
                                
                
                                <div id='Add-Line-Item' onClick={this.addNewItem}> + Line item </div>

                                <div id='Total'>Total</div>
                                <div id='Total-Price'>$0.00</div>
                                <div id='Add-Notes'>+ Notes</div>
                                <div id='Amount-Due'>Amount Due</div>
                                <div id='Amount-Price'>$0.00</div>
                            </div>
                        </div>

                        <div className='Bottom-Third-Container'
                            onMouseEnter={this.onMouseEnterBottomThird}
                            >
                            <h4 className='Client-Customer'>{devName}</h4> 
                            <p className='Dev-Address'>{devStreet} {devCity}, {devState}{devZip}</p>
                            <p className='Email'>mikerooze12@gmail.com</p>
                        </div>
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