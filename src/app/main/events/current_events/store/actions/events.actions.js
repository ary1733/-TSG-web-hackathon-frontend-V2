import { showMessage } from 'app/store/actions';
import axios from 'axios';

export const GET_CURRENT = '[EVENTS] GET_CURRENT';
export const GET_CATEGORIES = '[EVENTS] GET CATEGORIES';
export const DELETE_EVENT = '[EVENTS] DELETE EVENT';

export function getCurrent()
{
    const request = axios.get('/api/events/current', {withCredentials: true});

    return (dispatch) =>
        request.then((response) =>{
             dispatch({
                type   : GET_CURRENT,
                payload: response.data.events
            })
        }
        );
}

export function deleteEvent(event_id)
{
    const request = fetch(`/api/events/${event_id}/delete/`, {
        method: 'POST',
        credentials: 'include'
    })
    
    return (dispatch) =>
        request.then(async (response) => {
            let data = await response.json();
            dispatch(showMessage({message: data.message}));
            return dispatch({
                type   : DELETE_EVENT,
                payload: data
            })
        })
}

export function getCategories()
{
    const categories = [
        {
            'id'   : 0,
            'value': 'Technology',
            'label': 'Technology',
            'color': "#6a26cd"
        },
        {
            'id'   : 1,
            'value': 'Social and Culture',
            'label': 'Social and Culture',
            'color': "#ffd557"
        },
        {
            'id'   : 2,
            'value': 'Sports and Games',
            'label': 'Sports and Games',
            'color': "#5fff56"
        },
        {
            'id'   : 3,
            'value': 'Students\' Welfare',
            'label': 'Students\' Welfare',
            'color': "#ff56a2"
        }
    ]

    return (dispatch) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: categories
            })
}
