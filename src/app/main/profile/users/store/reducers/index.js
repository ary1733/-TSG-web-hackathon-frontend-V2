import {combineReducers} from 'redux';
import users from './updateusers.reducers';

const reducer = combineReducers({
    users
});

export default reducer;