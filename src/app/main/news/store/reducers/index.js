import {combineReducers} from 'redux';
import news from './news.reducers';

const reducer = combineReducers({
    news
});

export default reducer;