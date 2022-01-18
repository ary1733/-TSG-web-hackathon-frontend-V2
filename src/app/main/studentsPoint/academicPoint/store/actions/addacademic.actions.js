import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const SAVE_Academic = '[Academics] SAVE academic';
export const RESET_Academic = '[Academics] RESET academic';

export function saveacademic(data)
{
    const form = new FormData();
    for (let key in data)
        form.append(key, data[key]);
    form.append("attachment", data.attachment);
    const request = axios.post('/api/academic/add', data = form)
    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Academic Saved'}));

                return dispatch({
                    type   : RESET_Academic,
                })
            }
        );
}

export function newacademic()
{
    // const data = {
    //     title : "Enter Name..",
    //     subjectcode : "Enter subject code..",
    //     department : "Enter department..",
    //     semester : "Enter semester..",
    //     type : "Other",
    //     downloadLink: ""
    // };
    const data = {
        title : "Enter Name..",
        subjectcode : "Enter subjectcode..",
        department : "Enter department..",
        semester : "Enter semester..",
        downloadLink: "",
        type : "Other"
    };

    return {
        type   : SAVE_Academic,
        payload: data
    }
}