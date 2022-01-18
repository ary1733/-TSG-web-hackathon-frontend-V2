import * as Actions from '../actions';

const initialState = {
    data: null,
    reset: false
};

const addAcademicReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SAVE_Academic:
        {
            console.log(action);
            return {
                ...state,
                data: action.payload,
                reset: false
            };
        }
        case Actions.RESET_Academic:
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

export default addAcademicReducer;
