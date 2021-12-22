import axios from 'axios';

export const GET_UPCOMING = '[EVENTS] GET_UPCOMING';
export const GET_CATEGORIES = '[EVENTS] GET CATEGORIES';

export function getUpcoming()
{
    const request = axios.get('/api/events/current');

    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_UPCOMING,
                payload: response.data.events
            })
        }
        );
}

export function getCategories()
{
    const categories = [
        {
            'id'   : 0,
            'value': 'Technology',
            'label': 'Technology',
            'color': "#0000ff"
        },
        {
            'id'   : 1,
            'value': 'Social and Culture',
            'label': 'Social and Culture',
            'color': "#ffd557"
        },
        {
            'id'   : 2,
            'value': 'Sports and Games',
            'label': 'Sports and Games',
            'color': "#5fff56"
        },
        {
            'id'   : 3,
            'value': 'Students\' Welfare',
            'label': 'Students\' Welfare',
            'color': "#ff56a2"
        }
    ]

    return (dispatch) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: categories
            })
}
