import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_Event = '[events] GET event';
export const SAVE_Event = '[events] SAVE event';


export function saveevent(data)
{
    const form = new FormData();
    for (let key in data)
        form.append(key, data[key]);
    form.timeline = JSON.stringify(form.timeline)
    form.append("attachment", data.attachment);
    const request = fetch('/api/events/add', {
        method: 'POST',
        credentials: "include",
        body: form
      })
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'event Saved'}));

                return dispatch({
                    type   : SAVE_Event,
                    payload: response.data
                })
            }
        );
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
