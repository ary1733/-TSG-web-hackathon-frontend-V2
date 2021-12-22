import {combineReducers} from 'redux';
import events from './events.reducer';
import course from './course.reducer';

const reducer = combineReducers({
    events,
    course
});

export default reducer;
