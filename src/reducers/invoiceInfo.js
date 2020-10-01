import initialState from '../store/initialState';

const invoiceInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DEV_TYPE':
            return {
                ...state,
                devType: action.devType
            };
        case 'SET_DEV_INFO':
            return {
                ...state,
                devInfo: {
                    name: action.devInfo.name,
                    street: action.devInfo.street,
                    city: action.devInfo.city,
                    USstate: action.devInfo.USstate,
                    zip: action.devInfo.zip
                }
            };
        case 'SET_CUSTOMER_TYPE':
            return {
                ...state,
                customerType: action.customerType
            };
        case 'SET_CUSTOMER_INFO':
            return {
                ...state,
                customerInfo: {
                    name: action.customerInfo.name,
                    street: action.customerInfo.street,
                    city: action.customerInfo.city,
                    USstate: action.customerInfo.USstate,
                    zip: action.customerInfo.zip,
                }
            };

        case 'SET_FORMS_ARE_COMPLETE':
            return {
                ...state,
                formsAreComplete: action.formsAreComplete
            };
        case 'SET_INVOICE_ITEMS':
            return {
                ...state,
                invoiceItems: action.invoiceItems
            };
        default:
            return state;
    }
};

export default invoiceInfoReducer;