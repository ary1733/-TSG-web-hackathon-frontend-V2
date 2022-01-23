import * as Actions from '../actions';

const initialState = {
    data      : null,
    categories: []
};

const newsReducers = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.NEW_NEWS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.MAIL_NEWS:
        {
            return {
                ...state,
                ...action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default newsReducers;
