import * as Actions from '../actions';

const initialState = {
    data      : null,
    categories: []
};

const eventsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_UPCOMING:
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
        case Actions.DELETE_EVENT:
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

export default eventsReducer;
