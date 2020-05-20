const USstates = require('../JSONdata/USstates');

const USstatesDefaultState = {
    USstates
};

const USstatesReducer = (state = USstatesDefaultState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

export default USstatesReducer;