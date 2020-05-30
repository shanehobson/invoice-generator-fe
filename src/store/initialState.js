const USstates = require('../JSONdata/USstates');
const FeeTypes = require('../JSONdata/FeeTypes');

let devType = '',
    customerType = '',
    devInfo = {
        name: '',
        street: '',
        city: '',
        USstate: '',
        zip: ''
    },
    customerInfo = {
        name: '',
        street: '',
        city: '',
        USstate: '',
        zip: ''
    },
    invoiceItems = [
        {
            description: '',
            unit: 0,
            rate: 0,
            feeType: 'Flat fee',
            total: 0
        }
    ],

    currentPage = '1',
    formsAreComplete = false;

if (localStorage.getItem('devType') !== null) {
    devType = localStorage.getItem('devType');
}

if (localStorage.getItem('customerType') !== null) {
    customerType = localStorage.getItem('customerType');
}

if (JSON.parse(localStorage.getItem('devInfo')) !== null) {
    devInfo = JSON.parse(localStorage.getItem('devInfo'));
}

if (JSON.parse(localStorage.getItem('customerInfo') !== null)) {
    customerInfo = JSON.parse(localStorage.getItem('customerInfo'));
}

if (localStorage.getItem('pageNumber') !== null) {
    currentPage = localStorage.getItem('pageNumber');
}

if (localStorage.getItem('formsAreComplete') !== null) {
    formsAreComplete = true;
}


const initialState = {
    invoiceInfo: {
        devType,
        customerType,
        devInfo: {
            name: devInfo.name,
            street: devInfo.street,
            city: devInfo.city,
            USstate: devInfo.USstate,
            zip: devInfo.zip
        },
        customerInfo: {
            name: customerInfo.name,
            street: customerInfo.street,
            city: customerInfo.city,
            USstate: customerInfo.USstate,
            zip: customerInfo.zip
        },
        invoiceItems,
        formsAreComplete: formsAreComplete
    },
    pages: {
        currentPage
    },
    USstates: {
        USstates
    },
    FeeTypes: {
        FeeTypes
    }
}

export default initialState;