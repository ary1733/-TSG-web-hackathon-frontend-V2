import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_EVENT_INFO = '[EVENTS] GET_EVENT_INFO';

export function getEventInfo(event_id, token)
{
    const request = axios.get('/api/events/'+event_id+"/info", {token: token});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_EVENT_INFO,
                payload: response.data
            })
        );
}