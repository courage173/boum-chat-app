import { combineReducers } from 'redux';
import user from './user';
import ui from './ui';
import channel from './channel';
const appReducer = combineReducers({
    user,
    ui,
    channel,
});

export default (state, action) => {
    return appReducer(state, action);
};
