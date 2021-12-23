import jwtService from 'app/services/jwtService';
import {setUserData} from './user.actions';
import * as Actions from 'app/store/actions';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({username, password})
{
    return (dispatch) =>
        jwtService.signInWithUsernameAndPassword(username, password)
            .then((user) => {
                    console.log(user)
                    dispatch(setUserData(user));

                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                console.log("catch login error")
                console.log(error)
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: error
                });
            });
}

export function submitLoginWithOTP({email, password})
{
    return (dispatch) =>
        jwtService.signInWithEmailAndOTP(email, password)
            .then(
                (user)=> {
                    console.log(user)
                    dispatch(setUserData(user));
                    return dispatch({
                        type: LOGIN_SUCCESS
                    });
                }
                
            )
            .catch(
                error => {
                    console.log(error)
                    return dispatch({
                        type   : LOGIN_ERROR,
                        payload: error
                    });
                }
            )
    
}
