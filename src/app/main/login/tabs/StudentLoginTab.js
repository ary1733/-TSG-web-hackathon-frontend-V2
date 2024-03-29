import React, {useEffect, useRef, useState} from 'react';
import {Button, InputAdornment, Icon, Popover, Typography} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {TextFieldFormsy} from '@fuse';
import Formsy from 'formsy-react';
import * as authActions from 'app/auth/store/actions';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

function StudentLoginTab(props)
{
    const dispatch = useDispatch();
    const login = useSelector(({auth}) => auth.login);

    const [isFormValid, setIsFormValid] = useState(false);
    const formRef = useRef(null);
    const btnref =useRef(null)
    const [open, setOpen] = React.useState(false)
    const [popMessage, setpopMessage] = useState("Please send otp")
    const [sendOtpValid, setsendOtpValid] = useState(false);

    useEffect(() => {
        if ( login.error && (login.error.username || login.error.password) )
        {
            formRef.current.updateInputsWithError({
                email:login.error.email,
                password:login.error.password
            });
            disableButton();
        }
    }, [login.error]);

    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    function handleSubmit(model)
    {
        console.log(model)
        dispatch(authActions.submitLoginWithOTP(model));
    }
    function handleSendOtp(clkevt)
    { 
        const email = formRef.current.getModel().email
        if(email == undefined || email == "")
        {
            setpopMessage("Invalid mail id")
            setOpen(true)
            setTimeout(()=>{
                setOpen(false)
            },5000)
            return
        }
        return new Promise((resolve, reject) => {
            axios.post('api/login/student/sendotp', {
                'email':email
            }).then(response => {
                console.log(response);
                console.log(clkevt)
                setpopMessage(response.data.message)
                setOpen(true)

                setTimeout(()=>{
                    setOpen(false)
                },5000)
            }).catch(error => {
                reject(error);
            });
        });
    }
    return (
        <div className="w-full">
            <Formsy
                onValidSubmit={handleSubmit}
                onValid={enableButton}
                onInvalid={disableButton}
                ref={formRef}
                className="flex flex-col justify-center w-full"
            >
                <TextFieldFormsy
                    className="mb-2"
                    type="text"
                    name="email"
                    label="Email"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />
            <Button 
            ref={btnref}
            
            className="w-full mx-auto normal-case mb-16" variant="contained" color="primary" onClick={(e)=>{handleSendOtp(e)}}>
                Send OTP<SendIcon/>
                <Popover
                    open={open}
                    anchorEl={btnref.current}
                    // anchorPosition={{ top: positionTop, left: positionLeft }}
                    // onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                >
                    <Typography >{popMessage}</Typography>
                </Popover>
            </Button>
                <TextFieldFormsy
                    className="mt-16 mb-2"
                    type="password"
                    name="password"
                    label="OTP"
                    validations={{
                        isLength: 6
                    }}
                    validationErrors={{
                        isLength: 'character length is 6'
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                    }}
                    variant="outlined"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto normal-case"
                    aria-label="LOG IN"
                    disabled={!isFormValid}
                    value="firebase"
                >
                    Login
                </Button>
                
            </Formsy>
        </div>
    );
}

export default StudentLoginTab;
