import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography, Grid} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils, OutlinedDiv, TextFieldFormsy} from '@fuse';
import {useForm} from '@fuse/hooks';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import Select from '@material-ui/core/Select';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import moment from 'moment';
import { dateFnsLocalizer } from 'react-big-calendar';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker
  } from '@material-ui/pickers';
import { formatDistance } from 'date-fns/locale/af';

const useStyles = makeStyles(theme => ({
    eventImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    eventImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    eventImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $eventImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $eventImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $eventImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function UpdateUsers(props)
{
    const dispatch = useDispatch();
    const users = useSelector(({update}) => update.users);
	const [userType, setuserType] = useState("officials");
    const user = useSelector(({auth}) => auth.user);

    const [tabValue, setTabValue] = useState(0);
    const classes = useStyles(props);
    const {form, handleChange, setForm} = useForm(null);
    const [attachment, setattachment] = useState(null);

    useEffect(() => {
        
		dispatch(Actions.newUpdate());

    }, [dispatch, props.match.params]);

	function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChipChange(value, name)
    {
        setForm(_.set({...form}, name, value.map(item => item.value)));
    }

    function setFeaturedImage(id)
    {
        setForm(_.set({...form}, 'featuredImageId', id));
    }

    function handleUploadChange(e)
    {
        const file = e.target.files[0];
        if ( !file )
        {
            return;
        }
        setattachment(file);
    }
    function handleDateChangeStart(e)
    {
        var toRet = e.toISOString();

        setForm(_.set({...form}, `start`,
                toRet
            ));
    }

    function handleDateChangeEnd(e)
    {
        var toRet = e.toISOString();
        
        setForm(_.set({...form}, `end`,
                toRet
            ));
    }

	const handleUserTypeChange = (e) =>{
		setuserType(e.target.value);
	}


    function canBeSubmitted()
    {
        return (
            !_.isEqual(users.data, form)
        );
    }

    return (
        // <div>{console.log("ye dekho jara")}</div>
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to='/' color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    events
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png"/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            Update Users
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Update students and officials in database</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>

                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.updateUsers(attachment, userType))}
                            >
                                Submit
                            </Button>
                        </FuseAnimate>
                        
                    </div>
                )
            }

            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Details"/>
                </Tabs>
            }
            content={
                (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div id="event-form">
						
								<FormControl 
									fullWidth 
									variant='outlined' 
									className="mt-8 mb-16"
									>
										<InputLabel >User Type</InputLabel>
										<Select className="pl-5"
											name="type"
											type="radio"
											value={userType}
											label="User Type"//doubt
											onChange={handleUserTypeChange}
										>
											<MenuItem value={"students"}>students</MenuItem>
											<MenuItem value={"officials"}>officials</MenuItem>
										</Select>
								</FormControl>

                                    {
                                        <OutlinedDiv label="User Sheet">
                                            <input
                                                // className="hidden"
                                                id="sheet"
                                                type="file"
                                                name="sheet"
                                                onChange={handleUploadChange}
                                            />
                                        </OutlinedDiv>
                                    }

                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('update', reducer)(UpdateUsers);
