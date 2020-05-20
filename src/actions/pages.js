export const changePage = (pageNumber) => ({
    type: 'CHANGE_PAGE',
    pageNumber
});

export const startChangePage = (pageNumber) => {
    return (dispatch) => {
        localStorage.setItem('pageNumber', pageNumber);
        return dispatch(changePage(pageNumber));
    };
};