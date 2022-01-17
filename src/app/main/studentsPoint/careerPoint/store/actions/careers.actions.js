import { showMessage } from 'app/store/actions';
import axios from 'axios';

export const GET_CURRENT = '[CAREERS] GET_CURRENT';
export const GET_CATEGORIES = '[CAREERS] GET CATEGORIES';

export function getCurrent()
{
    const request = axios.get('api/careers/get_careers');
    // console.log(request)
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_CURRENT,
                payload: response.data.careers
            })
        }
        );
}

export function getCategories()
{
    const categories = [
        {
            'id'   : 0,
            'value': 'SDE',
            'label': 'SDE',
            'color': "#0000ff"
        },
        {
            'id'   : 1,
            'value': 'Quant',
            'label': 'Quant',
            'color': "#ffd557"
        },
        {
            'id'   : 2,
            'value': 'Data',
            'label': 'Data',
            'color': "#5fff56"
        },
        {
            'id'   : 3,
            'value': 'Consulting',
            'label': 'Consulting',
            'color': "#ff56a2"
        },
        {
            'id'   : 4,
            'value': 'Finance',
            'label': 'Finance',
            'color': "#ee56a2"
        },
        {
            'id'   : 5,
            'value': 'Core',
            'label': 'Core',
            'color': "#fe57a2"
        },
        {
            'id'   : 6,
            'value': 'Other',
            'label': 'Other',
            'color': "#83b6ad"
        }
    ]

    return (dispatch) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: categories
            })
}


export function deleteCareer(careerid)
{
    console.log(careerid)
    const request = axios.post('api/careers/delete/', {'careerid': careerid});
    // console.log(request)
    // returns remaining items
    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch(showMessage({message: 'Career Deleted'}));
            dispatch({
                type   : GET_CURRENT,
                payload: response.data.careers
            })
        }
        );
}