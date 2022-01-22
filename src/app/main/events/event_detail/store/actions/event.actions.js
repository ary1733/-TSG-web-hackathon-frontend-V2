import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_EVENT_INFO = '[EVENTS] GET_EVENT_INFO';
export const SAVE_REPORT = '[EVENTS] SAVE_REPORT';
export const GET_ACHIEVEMENTS = '[EVENTS] GET ACHIEVEMENTS';

export function getEventInfo(event_id)
{
    const request = axios.get('/api/events/'+event_id+"/info");

    return (dispatch) =>
        request.then((response) =>{
                console.log(response.data.timeline);
                response.data.timeline = JSON.parse(response.data.timeline);
                return dispatch({
                    type   : GET_EVENT_INFO,
                    payload: response.data
                })
            }
        );
}

export function uploadReport(report, event_id){
    let form = new FormData();
    form.append("report", report);
    const request = fetch(`/api/events/report/${event_id}/save-report`, {
        method: 'POST',
        body: form,
        credentials: 'include'
    })
    
    return (dispatch) =>
        request.then(async (response) => {
            let data = await response.json();
            dispatch(showMessage({message: data.message}));
            return dispatch({
                type   : SAVE_REPORT,
                payload: data
            })
        })
}

export function getAchievements(event_id)
{
    const request = axios.get(`/api/events/${event_id}/getAchievements`, {withCredentials: true});

    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_ACHIEVEMENTS,
                payload: response.data
            })
        }
        );
}