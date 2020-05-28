export const setDevType = (devType) => ({
    type: 'SET_DEV_TYPE',
    devType
});

export const startSetDevType = (devType) => {
    return (dispatch) => {
        localStorage.setItem('devType', devType);
        return dispatch(setDevType(devType));
    }
};

export const setDevInfo = ({ name, street, city, USstate, zip }) => ({
    type: 'SET_DEV_INFO',
    devInfo: { name, street, city, USstate, zip }
});

export const startSetDevInfo = (devInfo) => {
    return (dispatch) => {
        localStorage.setItem('devInfo', JSON.stringify(devInfo));
        return dispatch(setDevInfo(devInfo));
    }
};

export const setCustomerType = (customerType) => ({
    type: 'SET_CUSTOMER_TYPE',
    customerType
});

export const startSetCustomerType = (customerType) => {
    return (dispatch) => {
        localStorage.setItem('customerType', customerType);
        return dispatch(setCustomerType(customerType));
    }
};

export const setCustomerInfo = ({ name, street, city, USstate, zip }) => ({
    type: 'SET_CUSTOMER_INFO',
    customerInfo: { name, street, city, USstate, zip}
});

export const startSetCustomerInfo = (customerInfo) => {
    return (dispatch) => {
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
        return dispatch(setCustomerInfo(customerInfo));
    }
};

export const setFormsAreComplete = (formsAreComplete) => ({
    type: 'SET_FORMS_ARE_COMPLETE',
        formsAreComplete
});

export const startSetFormsAreComplete = (formsAreComplete) => {
    return (dispatch) => {
        localStorage.setItem('formsAreComplete', formsAreComplete);
        return dispatch(setFormsAreComplete(formsAreComplete));
    }
};

export const setInvoiceItems = (invoiceItems) => ({
    type: 'SET_INVOICE_ITEMS',
    invoiceItems
});