import { combineReducers } from 'redux';
import positions from './positionReducer';
import lines from './lineReducer';
import user from './userReducer';
import app from './appReducer';
import authorization from './authorizationReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';


const rootReducer = combineReducers({
    ajaxCallsInProgress,
    user,
    lines,
    positions,
    app,
    authorization
});

export default rootReducer;
