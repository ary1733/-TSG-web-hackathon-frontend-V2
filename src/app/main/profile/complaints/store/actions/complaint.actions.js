import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_Complaint = '[E-COMMERCE APP] GET complaint';
export const SAVE_Complaint = '[E-COMMERCE APP] SAVE complaint';

export function getcomplaint(params)
{
    const request = axios.get('/api/e-commerce-app/complaint', {params});

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_Complaint,
                payload: response.data
            })
        );
}

export function savecomplaint(data)
{
    const form = new FormData();
    for (let key in data)
        form.append(key, data[key]);
    form.append("attachment", data.attachment);
    const request = fetch('/api/complaints/addcomplaint', {
        method: 'POST',
        body: form
      })
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'complaint Saved'}));

                return dispatch({
                    type   : SAVE_Complaint,
                    payload: response.data
                })
            }
        );
}

export function newcomplaint()
{
    const data = {
        description     : '',
        active: true
    };

    return {
        type   : GET_Complaint,
        payload: data
    }
}
