import * as types from '../constants/ui';

export const toggleSideBar = () => dispatch =>
    dispatch({
        type: types.TOGGLE_SIDE_BAR,
    });
