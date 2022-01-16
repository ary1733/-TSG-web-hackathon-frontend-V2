import {combineReducers} from 'redux';
import current_careers from './careers.reducer';
import add_career from './addcareer.reducer';

const reducer = combineReducers({
    current_careers,
    add_career
});

export default reducer;
