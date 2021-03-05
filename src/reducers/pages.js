const pagesReducer = (state = { pdfTrack: 0 }, action) => {
    switch(action.type) {
        case 'CHANGE_PAGE':
            return {
                ...state, currentPage: action.pageNumber
            };
        case 'GENERATE_PDF':
            return {
                ...state, pdfTrack: state.pdfTrack + 1
            };
        default:
            return state;
    }
};

export default pagesReducer;