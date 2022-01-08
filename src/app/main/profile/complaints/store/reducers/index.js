import {combineReducers} from 'redux';
import complaint from './complaint.reducer';
import complaints from './complaints.reducer';

const reducer = combineReducers({
    complaint,
    complaints
});

export default reducer;
