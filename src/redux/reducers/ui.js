import * as types from '../constants/ui';

const initialState = {
    toggleSidebar: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_SIDE_BAR:
            return Object.assign({}, state, {
                toggleSidebar: !state.toggleSidebar,
            });
        default:
            return state;
    }
};
