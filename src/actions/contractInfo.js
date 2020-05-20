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

export const setDescription = (description) => ({
    type: 'SET_DESCRIPTION',
    description
});

export const startSetDescription = (description) => {
    return (dispatch) => {
        localStorage.setItem('description', description);
        return dispatch(setDescription(description));
    }
};

export const setSpecs = (specs) => ({
    type: 'SET_SPECS',
    specs
});

export const startSetSpecs = (specs) => {
    return (dispatch) => {
        localStorage.setItem('specs', specs);
        return dispatch(setSpecs(specs));
    }
};

export const setPaymentTerms = (paymentTerms) => ({
    type: 'SET_PAYMENT_TERMS',
    paymentTerms
});

export const startSetPaymentTerms = (paymentTerms) => {
    return (dispatch) => {
        localStorage.setItem('paymentTerms', paymentTerms);
        return dispatch(setPaymentTerms(paymentTerms));
    }
};

export const setSigInfoDev = ({ sigName, sigTitle }) => ({
    type: 'SET_SIG_INFO_DEV',
    sigName,
    sigTitle
});

export const startSetSigInfoDev = ({ sigName, sigTitle }) => {
    return (dispatch) => {
        localStorage.setItem('sigInfoDev', JSON.stringify({ sigName, sigTitle }));
        return dispatch(setSigInfoDev({ sigName, sigTitle }));
    }
};

export const setSigInfoCustomer = ({ sigName, sigTitle }) => ({
    type: 'SET_SIG_INFO_CUSTOMER',
        sigName,
        sigTitle
});

export const startSetSigInfoCustomer = ({ sigName, sigTitle }) => {
    return (dispatch) => {
        localStorage.setItem('sigInfoCustomer', JSON.stringify({ sigName, sigTitle }));
        return dispatch(setSigInfoCustomer({ sigName, sigTitle }));
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