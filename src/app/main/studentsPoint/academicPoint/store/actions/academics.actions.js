import { showMessage } from 'app/store/actions';
import axios from 'axios';

export const GET_CURRENT = '[ACADEMICS] GET_CURRENT';
export const GET_CATEGORIES = '[ACADEMICS] GET CATEGORIES';

export function getCurrent()
{
    const request = axios.get('api/academic/get_academics');
    // console.log(request)
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_CURRENT,
                payload: response.data.academics
            })
        }
        );
}

export function getCategories()
{
    const categories = [
        {
            'id'   : 0,
            'value': 'Books',
            'label': 'Books',
            'color': "#0000ff"
        },
        {
            'id'   : 1,
            'value': 'Study Material',
            'label': 'Study Material',
            'color': "#ffd557"
        },
        {
            'id'   : 2,
            'value': 'Question Paper',
            'label': 'Question Paper',
            'color': "#5fff56"
        },
        {
            'id'   : 3,
            'value': 'Research Paper',
            'label': 'Research Paper',
            'color': "#ff56a2"
        },
        {
            'id'   : 4,
            'value': 'Other',
            'label': 'Other',
            'color': "#ee56a2"
        }
    ]

    return (dispatch) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: categories
            })
}


export function deleteAcademic(academicid)
{
    console.log(academicid)
    const request = axios.post('api/academic/delete/', {'academicid': academicid});
    // console.log(request)
    // returns remaining items
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch(showMessage({message: 'Academic Deleted'}));
            dispatch({
                type   : GET_CURRENT,
                payload: response.data.academics
            })
        }
        );
}