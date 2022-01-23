import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_Event = '[events] GET event';
export const SAVE_Event = '[events] SAVE event';
export const SAVE_Achievement = '[achievements] SAVE achievement';
export const GET_Achievement = '[achievements] GET achievement';
// export const ADD_Remark = '[Complaints] ADD remark'


export function saveevent(data)
{
    const form = new FormData();
    for (let key in data){
        if (Array.isArray(data[key]))
            form.append(key, JSON.stringify(data[key]))
        else
            form.append(key, data[key]);
        console.log(key, data[key]);
    }
    console.log(form.timeline);
    form.append("attachment", data.attachment);
    const request = fetch('/api/events/add', {
        method: 'POST',
        credentials: "include",
        body: form
      })
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Event Saved'}));

                return dispatch({
                    type   : SAVE_Event,
                    payload: response.data
                })
            }
        );
}

export function saveachievement(data)
{
    const form = new FormData();
    for (let key in data)
        form.append(key, data[key]);
    form.append("certificate", data.attachment);
    const request = fetch('/api/achievement/add', {
        method: 'POST',
        credentials: "include",
        body: form
      })
    return (dispatch) =>
        request.then(async (response) => {
                let data = await response.json();
                dispatch(showMessage({message: data.message}));

                return dispatch({
                    type   : SAVE_Achievement,
                    payload: data
                })
            }
        );
}

export function newachievement()
{
    const data = {
        description     : '',
        active: true
    };

    return {
        type   : GET_Achievement,
        payload: data
    }
}

export function newevent()
{
    const data = {
        description     : '',
        active: true
    };

    return {
        type   : GET_Event,
        payload: data
    }
}
