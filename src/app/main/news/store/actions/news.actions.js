import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const NEW_NEWS = '[news] NEW NEWS';
export const MAIL_NEWS = '[news] MAIL NEWS';

export function newNews()
{
	const data = {
        description     : '',
        active: true
    };

    return {
        type   : NEW_NEWS,
        payload: data
    }
}

export function mailNews(form)
{ 
    const request = fetch(`/api/news/mailNews/`, {
        method: 'POST',
        body: form,
        credentials: 'include'
    })
    
    return (dispatch) =>
        request.then(async (response) => {
            let data = await response.json();
            dispatch(showMessage({message: data.message}));
            return dispatch({
                type   : MAIL_NEWS,
                payload: data
            })
        })
}
