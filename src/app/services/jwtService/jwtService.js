import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '@fuse/FuseUtils';

class jwtService extends FuseUtils.EventEmitter {

    init()
    {
        this.setInterceptors();
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
            const payload = {
                username: username,
                password: password
            };
            const requestOptions = {
                crossDomain: true,
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            };
            fetch('api/login/official/auth/', requestOptions).
            then(async (response) => {
                let data = await response.json()
                if (response.status != 200){
                    reject(data.message);
                    this.setSession(null);
                    this.emit('onAutoLogout', data.message);
                }else{
                    console.log('login valid');
                    this.setSession(response.user_type);
                    this.emit('onAutoLogin', true);
                    resolve(response);
                }
                return data;
            }).
            then(response => {
                console.log(response);
            }).catch(error => {
                reject(error);
            });
        });
    };

    signInWithEmailAndOTP = (email, otp) => {

        return new Promise((resolve, reject) => {
            const payload = {
                email: email,
                otp: otp
            };
            const requestOptions = {
                crossDomain: true,
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                credentials: 'include'
            };
            fetch('api/login/student/verifyotp', requestOptions).
            then(async (response) => {
                let data = await response.json()
                if (response.status != 200){
                    reject(data.message);
                    this.setSession(null);
                    this.emit('onAutoLogout', data.message);
                }else{
                    console.log('login valid');
                    this.setSession(response.user_type);
                    this.emit('onAutoLogin', true);
                    resolve(response);
                }
                return data;
            }).
            then(response => {
                console.log(response);
            }).catch(error => {
                reject(error);
            });
        });
    };


    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                crossDomain: true,
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                credentials: 'include'
            };
            fetch('api/login/user/token', requestOptions).
            then(async (response) => {
                let data = await response.json()
                if (response.status != 200){
                    reject(data.message);
                    // this.setSession(null);
                    // this.emit('onAutoLogout', data.message);
                }
                return data;
            }).
            then(response => {
                console.log(response);
                if (response.user)
                {
                    console.log("user set");
                    resolve(response.user);
                }
            }).catch(error => {
                reject(error);
            });
        });
    };

    updateUserData = (user) => {
        return axios.post('/api/auth/user/update', {
            user: user
        });
    };

    setSession = (user_type) => {
        if ( user_type )
        {
            // localStorage.setItem('jwt_access_token', access_token);
            localStorage.setItem('user_type', user_type);
            // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        }
        else
        {
            // localStorage.removeItem('jwt_access_token');
            localStorage.removeItem('user_type');
            // delete axios.defaults.headers.common['Authorization'];
        }
    };

    logout = () => {
        this.setSession(null);
        const requestOptions = {
            crossDomain: true,
            method: 'POST',
            credentials: 'include'
        };
        fetch('api/login/user/logout', requestOptions)
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
