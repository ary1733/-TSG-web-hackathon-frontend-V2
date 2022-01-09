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
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
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

function Event(props)
{
    const dispatch = useDispatch();
    const event = useSelector(({user}) => user.event);
    const eventId = props.location.pathname.split('/').at(-1);
    const user = useSelector(({auth}) => auth.user);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    const [attachment, setattachment] = useState(null);

    useEffect(() => {
        function updateeventState()
        {
            dispatch(Actions.newevent(), eventId);
        }

        updateeventState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (event.data && !form)
        {
            setForm(event.data);
            console.log(event.data)
        }
    }, [form, event.data, setForm]);

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
        setForm(_.set({...form}, `poster`,
                file
            ));
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

    function canBeSubmitted()
    {
        return (
            !_.isEqual(event.data, form)
        );
    }

    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/profile/events" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    events
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.subject ? form.subject : 'New event'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Event Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>

                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveevent(form))}
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
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div id="event-form">
                                
                                {eventId!='new' && <TextField
                                    className="mt-8 mb-16"
                                    id="date"
                                    name="date"
                                    onChange={handleChange}
                                    label="Date"
                                    type="text"
                                    value={`${new Date(form.date).toDateString()} ${moment(form.date).format('HH:mm:ss')}`}
                                    multiline
                                    rows={1}
                                    InputProps={{
                                        readOnly: eventId != 'new',
                                      }}
                                    variant="outlined"
                                    fullWidth
                                />}
                                <FormControl fullWidth variant='outlined'>
                                    <InputLabel >Event Type</InputLabel>
                                    <Select
                                        name="type"
                                        type="text"
                                        value={form.type}
                                        label="text"//doubt
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Technology"}>Technology</MenuItem>
                                        <MenuItem value={"Social and Culture"}>Social and Culture</MenuItem>
                                        <MenuItem value={"Sports and Games"}>Sports and Games</MenuItem>
                                        <MenuItem value={"Student's Welfare"}>Student's Welfare</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    className="mt-8 mb-16"
                                    id="title"
                                    name="title"
                                    onChange={handleChange}
                                    label="Title"
                                    type="text"
                                    value={form.title}
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    error ={form.title && form.title.length > 0 && form.title.length <= 100 ? false : true }
                                    helperText={form.title && form.title.length > 0 ?form.title.length <= 100 ?"":"Max 100 characters allowed":"Title cannot be empty"}
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="introduction"
                                    name="introduction"
                                    onChange={handleChange}
                                    label="Introduction"
                                    type="text"
                                    value={form.introduction}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="procedure"
                                    name="procedure"
                                    onChange={handleChange}
                                    label="Procedure"
                                    type="text"
                                    value={form.procedure}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mt-8 mb-16"
                                    id="judge_criteria"
                                    name="judge_criteria"
                                    onChange={handleChange}
                                    label="Judge Criteria"
                                    type="text"
                                    value={form.judge_criteria}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="timeline"
                                    name="timeline"
                                    onChange={handleChange}
                                    label="Timeline"
                                    type="text"
                                    value={form.timeline}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                />

                                <TextField
                                    className="mt-8 mb-16"
                                    id="venue"
                                    name="venue"
                                    onChange={handleChange}
                                    label="Venue"
                                    type="text"
                                    value={form.venue}
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                    error ={((form.venue?false:true) || form.venue.length <= 200 ? false : true )}
                                    helperText={(form.venue?false:true) || form.venue.length <= 200 ?"":"Max 200 characters allowed"}
                                    fullWidth
                                />

                                <FormControl fullWidth variant='outlined' className="mt-8 mb-16">
                                    <InputLabel >Event Tag</InputLabel>
                                    <Select
                                        name="tag"
                                        type="text"
                                        value={form.tag}
                                        label="text"//doubt
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={"Inter IIT"}>Inter IIT</MenuItem>
                                        <MenuItem value={"General Championship"}>General Championship</MenuItem>
                                        <MenuItem value={"None"}>None</MenuItem>
                                    </Select>
                                </FormControl>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker 
                                    label = "Material Date Picker"
                                    value = {form.start}
                                    onChange = {handleDateChangeStart}
                                    />
                                </MuiPickersUtilsProvider>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker 
                                    label = "End date and time of the event"
                                    value = {form.end}
                                    onChange = {handleDateChangeEnd}
                                    />
                                </MuiPickersUtilsProvider>



                                {/* <TextField
                                    className="mt-8 mb-16"
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    label="Description"
                                    type="text"
                                    value={form.description}
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    fullWidth
                                /> */}


                                    {
                                        <OutlinedDiv label="Poster">
                                            <input
                                                // className="hidden"
                                                id="poster"
                                                type="file"
                                                name="poster"
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

export default withReducer('user', reducer)(Event);