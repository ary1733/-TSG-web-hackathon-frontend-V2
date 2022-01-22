import * as Actions from '../actions/event.actions';

const initialState = null;

const infoReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EVENT_INFO:
        {
            return {
                ...state,
                ...action.payload
            };
        }
        case Actions.SAVE_REPORT:
        {
            return {
                ...state,
                ...action.payload
            };
        }
        case Actions.GET_ACHIEVEMENTS:
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

export default infoReducer;
