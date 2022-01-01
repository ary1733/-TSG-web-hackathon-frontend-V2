import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils, OutlinedDiv} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const useStyles = makeStyles(theme => ({
    complaintImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    complaintImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    complaintImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $complaintImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $complaintImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $complaintImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));

function Complaint(props)
{
    const dispatch = useDispatch();
    const complaint = useSelector(({user}) => user.complaint);

    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    const [attachment, setattachment] = useState(null);

    useEffect(() => {
        function updatecomplaintState()
        {
            const params = props.match.params;
            const complaintId = props.location.pathname.split('/').at(-1);
            if ( complaintId === 'new' )
            {
                dispatch(Actions.newcomplaint(), complaintId);
            }
            else
            {
                dispatch(Actions.getcomplaint(props.match.params));
            }
        }

        updatecomplaintState();
    }, [dispatch, props.match.params]);

    useEffect(() => {
        if (
            (complaint.data && !form) ||
            (complaint.data && form && complaint.data.id !== form.id)
        )
        {
            setForm(complaint.data);
        }
    }, [form, complaint.data, setForm]);

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
        setForm(_.set({...form}, `attachment`,
                file
            ));
    }

    function canBeSubmitted()
    {
        return (
            form.description.length > 0 &&
            !_.isEqual(complaint.data, form)
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
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/profile/complaints" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    complaints
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'New complaint'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Complaint Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.savecomplaint(form))}
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
                            // <form id="complaint-form" action="/api/complaints/addcomplaint" method="post" enctype="multipart/form-data" onSubmit={(e)=> e.preventDefault()}>
                            <form id="complaint-form">

                                <TextField
                                    className="mt-8 mb-16"
                                    id="description"
                                    name="description"
                                    onChange={handleChange}
                                    label="Description"
                                    type="text"
                                    value={form.description}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    fullWidth
                                />

                                <OutlinedDiv label="Attachment">
                                    <input
                                        // className="hidden"
                                        id="attachment"
                                        type="file"
                                        name="attachment"
                                        onChange={handleUploadChange}
                                    />
                                </OutlinedDiv>
                            </form>
                        )}
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('user', reducer)(Complaint);
