import React, {useEffect, useRef, useState} from 'react';
import {Paper, Hidden, Icon, IconButton, Fab, Typography, Stepper, Step, StepLabel} from '@material-ui/core';
import {FusePageSimple, FuseScrollbars, OutlinedDiv} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import SwipeableViews from 'react-swipeable-views';
import {green} from '@material-ui/core/colors';
import {Link} from 'react-router-dom';
import reducer from '../store/reducers';
import * as Actions from '../store/actions/event.actions';
import {makeStyles} from '@material-ui/styles';
import moment from 'moment';
import jwtService from 'app/services/jwtService';
import { Button } from '@material-ui/core';
import { authRoles } from "app/auth";

const useStyles = makeStyles(theme => ({
    stepLabel : {
        cursor: 'pointer!important'
    },
    successFab: {
        background: green[500] + '!important',
        color     : 'white!important'
    }
}));

function EventInfo(props)
{
    const dispatch = useDispatch();
    const event = useSelector(({Events}) => Events.event);
    const [report, setreport] = useState(null);
    const user = useSelector(({auth}) => auth.user);
    const contents = ["poster", "introduction", "procedure", "jugde_criteria", "timeline", "venue", "Posted By", "report", "results"];
    const classes = useStyles(props);
    const pageLayout = useRef(null);
    let activeStep = 0;

    useEffect(() => {
        const {event_id} = props.match.params;
        dispatch(Actions.getEventInfo(event_id));
        dispatch(Actions.getAchievements(event_id));
    }, [dispatch, props.match.params]);

    const handleScroll = e => {
        let element = e.target
        if (element.scrollHeight - element.scrollTop >= element.clientHeight) {
          activeStep += 1;
        }
      }

    function handleUploadChange(e)
    {
        const file = e.target.files[0];
        setreport(file);
    }

    const uploadReport = () =>{
        const {event_id} = props.match.params;
        dispatch(Actions.uploadReport(report, event_id));
    }

    const headingClasses = "text-3xl font-bold text-indigo-light";
    const pClasses = "text-xl mb-10 font-semibold text-white";
    const listElementsClasses = "text-xl mb-2 font-semibold text-white";

    return (
        <FusePageSimple
            classes={{
                content: "flex flex-col flex-auto overflow-hidden",
                header : "h-100 min-h-100 fixed z-10"
            }}
            header={
                <div className="flex flex-1 items-center px-16 lg:px-24">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout.current.toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>
                    <IconButton
                        className="mr-16"
                        to={(props.location.state && props.location.state.prevPath)?props.location.state.prevPath:'/'}
                        component={Link}
                    >
                        <Icon>arrow_back</Icon>
                    </IconButton>
                    {event && (
                        <div>
                            <Typography className="flex-1 text-3xl">{event.title}</Typography>
                            <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">Start - {new Date(event.start).toDateString()}, {moment(event.start).format('HH:mm:ss')}</Typography>
                            <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">End   - {new Date(event.end).toDateString()}, {moment(event.end).format('HH:mm:ss')}</Typography>
                        </div>
                    )}
                </div>
            }
            content={
                event && (
                    <div className="flex flex-1 relative overflow-hidden">
                        <FuseScrollbars className="w-full overflow-auto">
                        <SwipeableViews
                                className="overflow-hidden"
                                index={0}
                                enableMouseEvents={true}
                            >
                            <div className="flex justify-center p-10 pb-64 sm:pb-64 md:pb-64">  
                                <Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
                                    {event.poster && <div className="pb-20 "><img className="rounded-8 object-fill mx-auto" src={event.poster} /></div>}
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Introduction</Typography>
                                        <Typography className={pClasses} id="introduction" >{event.introduction}</Typography>
                                    </div>
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Procedure</Typography>
                                        <Typography className={pClasses} id="procedure" >{event.procedure}</Typography>
                                    </div>
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Jugde Criteria</Typography>
                                        <Typography className={pClasses} id="jugde_criteria" >{event.jugde_criteria}</Typography>
                                    </div>
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Timeline</Typography>
                                        <ul>
                                        {
                                            event.timeline && event.timeline.map((miniEvent)=>{
                                                return <li className={listElementsClasses} key={miniEvent}>{miniEvent}</li>
                                            })
                                        }
                                        </ul>
                                    </div>
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Venue</Typography>
                                        <Typography className={pClasses} id="venue">{event.venue}</Typography>
                                    </div>
                                    <div className='mb-5'>
                                        <Typography className={headingClasses}>Posted By</Typography>
                                        <Typography className={pClasses} id="organiser">{event.organiser}</Typography>
                                    </div>
                                    <div className='relative -bottom-20'>
                                    {
                                        authRoles.organisers.includes(user.role) && 
                                        <OutlinedDiv label="Update Report">
                                            <input
                                                // className="hidden"
                                                id="attachment"
                                                type="file"
                                                name="attachment"
                                                onChange={handleUploadChange}
                                            />
                                            <Button onClick={uploadReport} disabled={!report}>update</Button>
                                        </OutlinedDiv>
                                    }
                                    {event.report && <Button variant="contained" href={event.report} target='_blank' className='bg-indigo-darker hover:bg-indigo text-white text-lg float-right' >
                                        Download Report
                                    </Button>}
                                    <div className='mb-5' id="Results">
                                        <Typography className={headingClasses}>Results</Typography>
                                        <ul>
                                        {
                                            event.achievements && event.achievements.map((miniEvent)=>{
                                                return <li className={listElementsClasses} key={miniEvent.id}>{miniEvent.winner_name} got position {miniEvent.position}</li>
                                            })
                                        }
                                        </ul>
                                    </div>
                                    {
                                        authRoles.organisers.includes(user.role) && <Link to={{pathname:`/add-achievement/${props.match.params.event_id}/${props.match.params.eventTitle}`, state: {prevPath: window.location.pathname}}}>
                                            <Button variant="contained" className='bg-indigo-darker hover:bg-indigo text-white text-lg -translate-y-20 float-right' >
                                                Add achievement
                                            </Button>
                                        </Link>
                                    }
                                </div>
                                </Paper>
                            </div>
                            </SwipeableViews>
                        </FuseScrollbars>
                    </div>
                )
            }
            leftSidebarContent={
                event && (
                    <Stepper
                        classes={{root: "bg-transparent"}}
                        activeStep={contents.length}
                        orientation="vertical"
                        style={{position: "fixed"}}
                    >
                        {   
                            contents.map((content)=>{
                                return <Step key={content}>
                                            <StepLabel classes={{root: classes.stepLabel}}>{content.split('_').join(' ').toUpperCase()}</StepLabel>
                                        </Step>
                                })
                        }
                    </Stepper>
                )
            }
            innerScroll
            ref={pageLayout}
        />
    )
}

export default withReducer('Events', reducer)(EventInfo);
