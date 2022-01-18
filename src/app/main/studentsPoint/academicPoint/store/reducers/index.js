import {combineReducers} from 'redux';
import current_academics from './academics.reducer';
import add_academics from './addacademic.reducer';

const reducer = combineReducers({
    current_academics,
    add_academics
});

export default reducer;
