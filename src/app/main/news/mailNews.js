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

function MailNews(props)
{
    const dispatch = useDispatch();
    const news = useSelector(({news}) => news.news);
    const user = useSelector(({auth}) => auth.user);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    const [attachment, setattachment] = useState(null);

    useEffect(() => {
        dispatch(Actions.newNews());
    }, [dispatch]);

    useEffect(() => {
        if (news.data && !form)
        {
            setForm({...news.data});
        }
    }, [form, news.data, setForm]);

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

    function canBeSubmitted()
    {
        return (
            !_.isEqual(news.data, form)
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
                                            Mail News
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Send any news to all the users</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>

                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.mailNews(form))}
                            >
                                Mail
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
                (form && 
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div id="event-form">
						
                                <TextField
                                    className="mt-8 mb-16"
                                    id="subject"
                                    name="subject"
                                    onChange={handleChange}
                                    label="Subject"
                                    type="text"
                                    value={form.subject?form.subject:""}
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mt-8 mb-16"
                                    id="body"
                                    name="body"
                                    onChange={handleChange}
                                    label="Body"
                                    type="text"
                                    value={form.body?form.body:""}
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('news', reducer)(MailNews);
