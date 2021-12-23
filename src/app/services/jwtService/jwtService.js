import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
                {
                    // if you ever get an unauthorized response, logout the user
                    this.emit('onAutoLogout', 'Invalid access_token');
                    this.setSession(null);
                }
                throw err;
            });
        });
    };

    handleAuthentication = () => {

        let access_token = this.getAccessToken();

        if ( !access_token )
        {
            return;
        }

        if ( this.isAuthTokenValid(access_token) )
        {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        }
        else
        {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        return new Promise((resolve, reject) => {
            axios.post('/api/auth/register', data)
                .then(response => {
                    if ( response.data.user )
                    {
                        this.setSession(response.data.access_token);
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                    }
                });
        });
    };

    signInWithUsernameAndPassword = (username, password) => {

        return new Promise((resolve, reject) => {
            axios.post('api/login/official/auth/', {
                 
                username,
                password
                
            }).then(response => {
                console.log(response);
                if ( response.data.token )
                {
                    console.log('login valid');
                    this.setSession(response.data.token,response.data.user_type);
                    this.emit('onAutoLogin', true);
                    resolve(response.data);
                }
                else
                {
                    reject(response.data);
                    this.setSession(null);
                    this.emit('onAutoLogout', 'credentials invalid');
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    signInWithEmailAndOTP = (email, otp) => {

        return new Promise((resolve, reject) => {
            axios.post('api/login/student/verifyotp', { 
                email,
                otp
            }).then(response => {
                console.log(response);
                if ( response.data.token )
                {
                    this.setSession(response.data.token,response.data.user_type);
                    resolve(response.data);
                    this.emit('onAutoLogin', true);
                    resolve(response.data);
                }
                else
                {
                    reject(response.data);
                    this.setSession(null);
                    this.emit('onAutoLogout', 'otp invalid');
                }
            }).catch(error => {
                // erorr .data BUG
                reject(error);
            });
        });
    };


    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axios.post('api/login/user/token', {
                token: this.getAccessToken()
            })
                .then(response => {
                    console.log(response);
                    if ( response.data.user )
                    {
                        resolve(response.data.user);
                    }
                    else
                    {
                        reject(response.data.error);
                        this.setSession(null);
                        this.emit('onAutoLogout', 'access-token invalid');
                    }
                });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = (access_token,user_type) => {
        if ( access_token )
        {
            localStorage.setItem('jwt_access_token', access_token);
            localStorage.setItem('user_type', user_type);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            localStorage.removeItem('jwt_access_token');
            localStorage.removeItem('user_type');
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
    };

    isAuthTokenValid = access_token => {
        if ( !access_token )
        {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if ( decoded.exp < currentTime )
        {
            console.warn('access token expired');
            return false;
        }
        else
        {
            return true;
        }
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };

    getUserType = () => {
        return window.localStorage.getItem('user_type');
    }
}

const instance = new jwtService();

export default instance;
