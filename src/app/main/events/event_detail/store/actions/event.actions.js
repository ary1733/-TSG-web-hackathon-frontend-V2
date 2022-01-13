import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_EVENT_INFO = '[EVENTS] GET_EVENT_INFO';

export function getEventInfo(event_id)
{
    const request = axios.get('/api/events/'+event_id+"/info");

    return (dispatch) =>
        request.then((response) =>{
                response.data.timeline = JSON.parse(response.data.timeline);
                return dispatch({
                    type   : GET_EVENT_INFO,
                    payload: response.data
                })
            }
        );
}