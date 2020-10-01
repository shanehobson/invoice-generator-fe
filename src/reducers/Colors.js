import initialState from '../store/initialState';

const colorReducer = (state = initialState) => {
    switch (action.type) {
        case SET_COLORS:
            return {
                ...state,
                colors: {
                    standard: action.colors.standard,
                    dark: action.colors.dark,
                    light: action.colors.light,
                }
            }
    }
}

export default colorReducer;