import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';

const appReducer = combineReducers({
    user,
    ui,
});

export default (state, action) => {
    return appReducer(state, action);
};
