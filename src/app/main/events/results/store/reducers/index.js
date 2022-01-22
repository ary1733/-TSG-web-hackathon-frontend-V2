import {combineReducers} from 'redux';
import past_events from './events.reducer';

const reducer = combineReducers({
    past_events
});

export default reducer;
