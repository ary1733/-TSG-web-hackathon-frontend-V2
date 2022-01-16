import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const SAVE_Complaint = '[Complaints] SAVE complaint';
export const RESET_Complaint = '[Complaints] RESET complaint';

export function savecomplaint(data)
{
    const form = new FormData();
    for (let key in data)
        form.append(key, data[key]);
    form.append("attachment"
    
    , data.attachment);
    const request = axios.post('/api/careers/add', data = form)
    // const request = fetch('/api/complaints/addcomplaint',{
    //     method: 'POST',
    //     body: form
    //   })
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Career Saved'}));

                return dispatch({
                    type   : RESET_Complaint,
                })
            }
        );
}

export function newcomplaint()
{
    const data = {
        title : "Enter Name..",
        jobprofile : "Enter jobprofile..",
        location : "Enter location..",
        type : "Other"
    };

    return {
        type   : SAVE_Complaint,
        payload: data
    }
}