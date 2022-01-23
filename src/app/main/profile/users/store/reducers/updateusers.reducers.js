import * as Actions from '../actions';

const initialState = {
    data      : null,
    categories: []
};

const updateUsersReducers = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.NEW_UPDATE:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.UPDATE_USERS:
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

export default updateUsersReducers;
