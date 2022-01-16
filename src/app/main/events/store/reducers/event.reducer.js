import * as Actions from '../actions';

const initialState = {
    data: null
};

const eventReducer = function (state = initialState, action) {
    switch ( action.type )
    {

        case Actions.SAVE_Event:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_Event:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_Achievement:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_Achievement:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default eventReducer;
