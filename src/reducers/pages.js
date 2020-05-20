import initialState from '../store/initialState';

const pagesReducer = (state = {}, action) => {
    switch(action.type) {
        case 'CHANGE_PAGE':
            return {
                currentPage: action.pageNumber
            };
        default:
            return state;
    }
};

export default pagesReducer;