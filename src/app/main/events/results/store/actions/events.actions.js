import { GET_Event } from 'app/main/events/store/actions';
import axios from 'axios';
import { showMessage } from 'app/store/actions';
export const GET_PAST_EVENTS = '[EVENTS] GET PAST EVENTS';
export const GET_RESULT_CATEGORIES = '[EVENTS] GET RESULT CATEGORIES';
export const DELETE_EVENT = '[EVENTS] DELETE EVENT';

export function getPastEvents(days)
{
    const error = !(days && days.length > 0 && !isNaN(parseInt(days)));
    if (error){
        return (dispatch) =>
            dispatch(showMessage({message: "Max Days should be a integer"}));
    }
        
    const request = axios.get(`/api/events/ended`, { params: {t: days} });

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