import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';

export const GET_COMPLAINTS = '[COMPLAINTS] GET ORDERS';
export const SET_COMPLAINTS_SEARCH_TEXT = '[COMPLAINTS] SET COMPLAINTS SEARCH TEXT';

export function getComplaints(props)
{
    const requestOptions = {
        crossDomain: true,
        method: 'GET',
        credentials: 'include'
    };
    const request = fetch('api/complaints/getcomplaints/', requestOptions)

    return (dispatch) =>
        request.then(async (response) => {
            let data = await response.json();
            dispatch(showMessage({message: data.message}));
            return dispatch({
                type   : GET_COMPLAINTS,
                payload: data.complaints
            })
        });
}

export function setComplaintsSearchText(complaints)
{
    return {
        type      : SET_COMPLAINTS_SEARCH_TEXT,
        searchText: complaints.target.value
    }
}

