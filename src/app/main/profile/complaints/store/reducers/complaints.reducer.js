import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const complaintsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_COMPLAINTS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SET_COMPLAINTS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default complaintsReducer;
