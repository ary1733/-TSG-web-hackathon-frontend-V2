import * as Actions from '../actions';

const initialState = {
    data: null
};

const complaintReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_Complaint:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_Complaint:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.ADD_Remark:
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

export default complaintReducer;
