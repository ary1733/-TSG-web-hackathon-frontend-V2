import * as Actions from '../actions';

const initialState = {
    data      : null,
    categories: []
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CURRENT:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default eventsReducer;
