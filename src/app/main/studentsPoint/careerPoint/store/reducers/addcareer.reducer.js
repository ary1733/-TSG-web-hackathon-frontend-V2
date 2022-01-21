import * as Actions from '../actions';

const initialState = {
    data: null,
    reset: false
};

const complaintReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SAVE_Complaint:
        {
            return {
                ...state,
                data: action.payload,
                reset: false
            };
        }
        case Actions.RESET_Complaint:
        {
            return {
                ...state,
                data: action.payload,
                reset: true
            };
        }
        default:
        {
            return state;
        }
    }
};

export default complaintReducer;
