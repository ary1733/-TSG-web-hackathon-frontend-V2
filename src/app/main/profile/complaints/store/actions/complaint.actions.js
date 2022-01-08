import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_Complaint = '[Complaints] GET complaint';
export const SAVE_Complaint = '[Complaints] SAVE complaint';
export const ADD_Remark = '[Complaints] ADD remark'

export function getcomplaint(complaintId)
{
    const request = axios.get(`/api/complaints/getcomplaint/${complaintId}`);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_Complaint,
                payload: response.data.complain
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
        body: form,
        credentials: 'include'
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

export function addremark(complaintId, remark)
{
    const request = fetch('/api/complaints/addRemark', {
        crossDomain: true,
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            complain_id:complaintId,
            remark:remark
        })
      })
    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Remark updated'}));

                return dispatch({
                    type   : ADD_Remark,
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
