import { combineReducers } from 'redux';
import commentsReducer from './comments';

const rootReducer = combineReducers({
    // state: (state = {}) => state
    // for comment list to work: make an array out of it
    // dummy reducer:
    // comments: (state = []) => state
    comments: commentsReducer
});

export default rootReducer;
