import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debounce } from '../utility/debounce';

import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import '../styles/WorkingDoc.css';

import DiscountSidebar from './DiscountSidebar';
import InvoiceSidebar from './InvoiceSidebar';
import NotesSidebar from './NotesSidebar';
import EditInvoice from './EditInvoice';

class Contract extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: {
                standard: '#4cae4f',
                dark: '#162637',
                light: '#EEFFEC'
            },
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
                discountValue: 0,
                discountPercent: 0, // @todo add to redux
                total: 0 // @todo add to redux
            },

            editIcons: {
                topThird: false,
                middleThird: false,
                bottomThird: false,
            },
            notes: ''
        };
    };

    componentWillReceiveProps(nextProps) {
        const subtotal = this.calculateSubtotal(nextProps.invoiceInfo.invoiceItems)

        this.setState({
            ...this.state,
            ...nextProps,
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
        });
    }, 50)

    onMouseLeaveInvoice = debounce(() => {
        this.setState({
            editIcons: {
                topThird: false,
                middleThird: false,
                bottomThird: false
            }
        });
    }, 50)

    onColorChange = (newColor) => {
        this.setState({
            ...this.state,
            colors: {
                standard: newColor,
                light: this.lighten(newColor),
                dark: this.darken(newColor)
            }
        });
    }

    lighten = (color) => {
        return color;
    }

    darken = (color) => {
        return color;
    }

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
        const subtotal = invoiceItems.map(item => parseFloat(item.total))
        .reduce((a, b) => {
            return a + b;
        });
        return subtotal.toFixed(2); 
    }

    updateInvoiceItem = (item) => {
        const items = this.state.invoiceInfo.invoiceItems;
        items.push(item)
        this.setState({
            invoiceItems: items
        });
    }

    updateDiscounts = (discountValue, discountPercent) => {
        this.setState({
            discountValue,
            discountPercent
        })
    }

    updateNotes = (notes) => {
        this.setState({
            notes: notes
        });
    }

    removeNotes = () => {
        this.setState({
            ...this.state,
            notes: ''
        });
    }

    removeLineItem = (index) => {
        const newList = this.state.invoiceInfo.invoiceItems.filter((_, i) => i !== index);
        this.setState({
            ...this.state,
            invoiceInfo: {
                ...this.state.invoiceInfo,
                invoiceItems: newList
            }        
        });
    }

    render() {

        const { standard, dark, light } = this.state.colors;

        const { invoiceInfo, editIcons, notes, discountValue, discountPercent } = this.state;
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
                <div className='Invoice-Page-Container' style={{borderTop: `3px solid ${standard}`}}>
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
                                <h1 id='Invoice-Title' style={{color: standard}}>
                                    Invoice
                                    </h1>
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
                            
                            <div>
                                {invoiceItems.map((item, i) => (              
                                    <div className='Line-Items-Container' key={i}>
                                        <div className='Line-Items'>                       
                                            <div id='Item'>{item.description}</div>
                                            <div id='Unit'>{item.unit}</div>
                                            <div id='Rate'>
                                                {item.feeType === 'Flat fee' && item.rate }
                                                {item.feeType !== 'Flat fee' && item.rate + '/' + item.feeType }
                                            </div>
                                            <div id='Item-Total'>${item.total}</div>
                                            <div className='Line-Item-Icons' key={i}>
                                                <DeleteIcon
                                                    onClick={() => this.removeLineItem(i)}
                                                    style={{fontSize: '20px', paddingRight: '10px'}}                              
                                                />         
                                                <EditInvoice
                                                    item={item}
                                                    index={i}
                                                    FeeTypes={this.props.FeeTypes}
                                                    updateInvoiceItem={this.updateInvoiceItem}
                                                    invoiceItems={invoiceItems}
                                                />
                                            </div>                                                                                                                                                                                          
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className='Total-Info'>
                                <div id='Subtotal'>Subtotal</div>
                                <div id='Subtotal-Price'>${subtotal}</div>
                                <div id='Taxes'>+ Taxes</div>
                                {discountValue &&
                                    <div>
                                        <div>{discountValue}</div>
                                        <div>{discountPercent}</div>
                                    </div>
                                }
                                <div id='Discount'>
                                    <DiscountSidebar                           
                                        updateDiscounts={this.updateDiscounts}
                                        subtotal={subtotal}
                                        discountValue={discountValue}
                                        discountPercent={discountPercent}
                                    />
                                </div>

                                <div id='Add-Line-Item'>
                                    <InvoiceSidebar
                                        FeeTypes={this.props.FeeTypes}
                                        updateInvoiceItem={this.updateInvoiceItem}
                                        invoiceItems={invoiceItems}
                                    />
                                </div>
                                
                                <div id='Total'>Total</div>
                                <div id='Total-Price'>$0.00</div>

                                <div className='Add-Notes'>
                                    <NotesSidebar 
                                        updateNotes={this.updateNotes}
                                        notes={notes}
                                        icon={'add'}
                                    />        
                                </div>
                                
                                <div id='Amount-Due'>Amount Due</div>
                                <div id='Amount-Price'>$0.00</div>                                                     
                            </div>

                            {notes && 
                                <div className='Notes'>                            
                                    <div>
                                        <div className='Notes-Header'>
                                            <h3>Notes</h3>
                                        </div>
                                        <div>
                                            {notes}
                                        </div>                                                                                                                                       
                                    </div >
                                    <div className='Notes-Icons'>
                                        <DeleteIcon
                                            onClick={() => this.removeNotes(notes)}
                                            style={{fontSize: '20px', paddingRight: '10px'}}                              
                                        />                  
                                        <NotesSidebar                   
                                            updateNotes={this.updateNotes}
                                            notes={notes}
                                            icon={'edit'}
                                        /> 
                                    </div>        
                                </div>
                            }
                        </div>

                        <div className='Bottom-Third-Container'
                            onMouseEnter={this.onMouseEnterBottomThird}
                        >
                            <h4 className='Client-Customer'>{devName}</h4> 
                            <p className='Dev-Address'>
                                {devStreet} 
                                {devCity}, 
                                {devState}
                                {devZip}
                            </p>
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
    invoiceInfo: state.invoiceInfo,
    FeeTypes: state.FeeTypes
});

export default connect(mapStateToProps)(Contract);