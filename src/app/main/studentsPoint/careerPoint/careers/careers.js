import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    Card,
    CardContent,
    OutlinedInput,
    Icon,
    TextField,
    Typography,
    CardActions,
    Divider,
    Select,
    InputLabel,
    FormControl,
    MenuItem
    // LinearProgress
} from '@material-ui/core';
import Axios from 'axios';
import {makeStyles, useTheme} from '@material-ui/styles';
import {FuseAnimate, FuseAnimateGroup} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import _ from '@lodash';
// import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import jwtService from 'app/services/jwtService';
// import moment from 'moment';

const useStyles = makeStyles(theme => ({
    header    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : 'absolute',
        top          : 0,
        left         : 50,
        opacity      : .04,
        fontSize     : 512,
        width        : 256,
        height       : 256,
        pointerEvents: 'none'
    }
}));

function Careers(props)
{
    const dispatch = useDispatch();
    const careers = useSelector(({careers}) => careers.current_careers.data);
    const categories = useSelector(({careers}) => careers.current_careers.categories);

    const classes = useStyles(props);
    const theme = useTheme();
    const [filteredData, setFilteredData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        dispatch(Actions.getCurrent());
        dispatch(Actions.getCategories());
    }, [dispatch]);

    useEffect(() => {
        function getFilteredArray()
        {
            if ( searchText.length === 0 && selectedCategory === "all" )
            {
                console.log(careers);
                return careers;
            }

            return _.filter(careers, item => {
                if ( selectedCategory !== "all" && item.type.toLowerCase() !== selectedCategory.toLowerCase() )
                {
                    console.log(item.type, selectedCategory);
                    return false;
                }
                return item.title.toLowerCase().includes(searchText.toLowerCase())
            });
        }

        if ( careers )
        {
            setFilteredData(getFilteredArray());
        }
    }, [careers, searchText, selectedCategory]);

    function handleSelectedCategory(event)
    {
        setSelectedCategory(event.target.value);
    }

    function handleSearchText(event)
    {
        setSearchText(event.target.value);
    }

    function buttonStatus(course)
    {
        switch ( course.activeStep )
        {
            case course.totalSteps:
                return "COMPLETED";
            case 0:
                return "START";
            default:
                return "CONTINUE";
        }
    }

    return (
        <div className="flex flex-col flex-1 w-full">
            <div
                className={clsx(classes.header, "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                    <Typography color="inherit" className="text-24 sm:text-40 font-light">
                        Career Point
                    </Typography>
                </FuseAnimate>

                <FuseAnimate duration={400} delay={600}>
                    <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                            <span className="opacity-75">
                                Hope you will find your path here.
                            </span>
                    </Typography>
                </FuseAnimate>

                <Icon className={classes.headerIcon}>business</Icon>
            </div>

            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                    <TextField
                        label="Search for a job profile"
                        placeholder="Enter a keyword..."
                        className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                        value={searchText}
                        inputProps={{
                            'aria-label': 'Search'
                        }}
                        onChange={handleSearchText}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                        <InputLabel htmlFor="category-label-placeholder">
                            Category
                        </InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={handleSelectedCategory}
                            input={
                                <OutlinedInput
                                    labelWidth={("category".length * 9)}
                                    name="category"
                                    id="category-label-placeholder"
                                />
                            }
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>

                            {categories.map(category => (
                                <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {useMemo(() => (
                    filteredData && (
                        filteredData.length > 0 ? (
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.slideUpBigIn"
                                    }}
                                    className="flex flex-wrap py-24"
                                >
                                    {filteredData.map((career) => {
                                        const category = categories.find(_cat => _cat.value.toLowerCase() === career.type.toLowerCase());
                                        return (
                                            <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={career.id}>
                                                <Card elevation={1} className="flex flex-col h-256">
                                                    <div
                                                        className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                                                        style={{
                                                            background: category.color,
                                                            color     : theme.palette.getContrastText(category.color)
                                                        }}
                                                    >
                                                        <Typography className="font-medium truncate" color="inherit">{category.label}</Typography>
                                                        <div className="flex items-center justify-center opacity-75">
                                                            <Icon className="text-20 mr-8" color="inherit">calendar_today</Icon>
                                                            <div className="text-16 whitespace-no-wrap">{new Date(career.date).toDateString()}</div>
                                                        </div>
                                                    </div>
                                                    <CardContent className="flex flex-col flex-auto items-center justify-center">
                                                        {/* content of events here */}
                                                        <Typography className="text-center text-16 font-400">{career.title}</Typography>
                                                        <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">Location - {career.location}</Typography>
                                                        <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">Job Profile - {career.jobprofile}</Typography>
                                                    </CardContent>
                                                    <Divider/>
                                                    <CardActions className="justify-center">
                                                        <Button
                                                            // to={{ pathname: `/events/${event.id}/${event.title}`, state: { event_id: event.id, prevPath: window.location.pathname} }} // event page
                                                            // href= {`${career.report_url}?token=${jwtService.getAccessToken()}`}
                                                            // component={Link}
                                                            onClick={() =>{Axios({
                                                                url: career.report_url, //your url
                                                                method: 'GET',
                                                                responseType: 'blob', // important
                                                            }).then((response) => {
                                                                const url = window.URL.createObjectURL(new Blob([response.data]));
                                                                const link = document.createElement('a');
                                                                link.href = url;
                                                                link.setAttribute('download', `${career.title}.pdf`); //or any other extension
                                                                document.body.appendChild(link);
                                                                link.click();
                                                            });}}
                                                            disabled={career.report_url == null}
                                                            className="justify-start px-32"
                                                            color="secondary"
                                                        >
                                                            View
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </div>
                                        )
                                    })}
                                </FuseAnimateGroup>
                            ) :
                            (
                                <div className="flex flex-1 items-center justify-center">
                                    <Typography color="textSecondary" className="text-24 my-24">
                                        No careers found!
                                    </Typography>
                                </div>
                            )
                    )), [categories, filteredData, theme.palette])}
            </div>
        </div>
    );
}

export default withReducer('careers', reducer)(Careers);
