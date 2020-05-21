const FeeTypes = require('../JSONdata/FeeTypes');

const FeeTypesDefaultState = {
    FeeTypes
};

const FeeTypesReducer = (state = FeeTypesDefaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default FeeTypesReducer;