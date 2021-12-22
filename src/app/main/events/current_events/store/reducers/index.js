import {combineReducers} from 'redux';
import current_events from './events.reducer';

const reducer = combineReducers({
    current_events
});

export default reducer;
