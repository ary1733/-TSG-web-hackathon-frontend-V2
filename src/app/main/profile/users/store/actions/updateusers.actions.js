import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const NEW_UPDATE = '[users] NEW UPDATE';
export const UPDATE_USERS = '[users] UPDATE USERS';

export function newUpdate()
{
	const data = {
        description     : '',
        active: true
    };

    return {
        type   : NEW_UPDATE,
        payload: data
    }
}

export function updateUsers(sheet, user_type)
{ 
	let form = new FormData();
    form.append("sheet", sheet);

    const request = fetch(`/api/updateusers/${user_type}/`, {
        method: 'POST',
        body: form,
        credentials: 'include'
    })
    
    return (dispatch) =>
        request.then(async (response) => {
            let data = await response.json();
            dispatch(showMessage({message: data.message}));
            return dispatch({
                type   : UPDATE_USERS,
                payload: data
            })
        })
}
