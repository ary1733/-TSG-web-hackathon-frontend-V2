import { GET_Event } from 'app/main/events/store/actions';
import axios from 'axios';

export const GET_PAST_EVENTS = '[EVENTS] GET PAST EVENTS';
export const GET_RESULT_CATEGORIES = '[EVENTS] GET RESULT CATEGORIES';

export function getPastEvents()
{
    const request = axios.get(`/api/events/ended`, { params: { t: 60 } });

    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_PAST_EVENTS,
                payload: response.data.events
            })
        }
        );
}

export function getResultCategories()
{
    const categories = [
        {
            'id'   : 0,
            'value': 'Inter IIT',
            'label': 'Inter IIT',
            'color': "#0000ff"
        },
        {
            'id'   : 1,
            'value': 'General Championship',
            'label': 'General Championship',
            'color': "#ffd557"
        },
        {
            'id'   : 2,
            'value': 'Other',
            'label': 'Other',
            'color': "#5fff56"
        }
    ]

    return (dispatch) =>
            dispatch({
                type   : GET_RESULT_CATEGORIES,
                payload: categories
            })
}
