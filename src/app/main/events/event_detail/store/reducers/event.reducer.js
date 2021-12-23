import * as Actions from '../actions/event.actions';

const initialState = null;

const infoReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_EVENT_INFO:
        {
            return {
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
