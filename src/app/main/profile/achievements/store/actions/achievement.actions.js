import axios from 'axios';
import jwtService from 'app/services/jwtService';

export const GET_ACHIEVEMENTS = '[ACHIEVEMENTS] GET_ACHIEVEMENT';
export const GET_CATEGORIES = '[ACHIEVEMENTS] GET_CATEGORIES';

export function getAchievements()
{
    const request = axios.get('/api/achievement/student/getAchievements', {withCredentials: true});

    return (dispatch) =>
        request.then((response) =>{
            console.log(response);
            dispatch({
                type   : GET_ACHIEVEMENTS,
                payload: response.data.achievements
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
