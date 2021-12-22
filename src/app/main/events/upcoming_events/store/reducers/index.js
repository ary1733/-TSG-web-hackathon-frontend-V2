import {combineReducers} from 'redux';
import upcoming_events from './events.reducer';

const reducer = combineReducers({
    upcoming_events
});

export default reducer;
