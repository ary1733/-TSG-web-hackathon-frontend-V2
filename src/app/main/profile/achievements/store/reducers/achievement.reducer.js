import * as Actions from '../actions';

const initialState = {
    data      : null,
    categories: []
};

const achievementReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ACHIEVEMENTS:
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

export default achievementReducer;
