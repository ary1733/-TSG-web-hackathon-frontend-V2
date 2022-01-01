import React, { useEffect, useMemo, useState } from 'react';
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
    MenuItem,
    LinearProgress
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import { FuseAnimate, FuseAnimateGroup } from '@fuse';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import _ from '@lodash';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import moment from 'moment';
import { auth } from 'firebase';
import jwtService from 'app/services/jwtService';

const useStyles = makeStyles(theme => ({
    header: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color: theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position: 'absolute',
        top: -64,
        left: 0,
        opacity: .04,
        fontSize: 512,
        width: 512,
        height: 512,
        pointerEvents: 'none'
    }
}));

function Achievements(props) {
    const dispatch = useDispatch();
    const achievements = useSelector(({ user }) => user.achievement.data);
    const categories = useSelector(({ user }) => user.achievement.categories);
    const user = useSelector(({ auth }) => auth.user);

    const classes = useStyles(props)
    const theme = useTheme();
    const [filteredData, setFilteredData] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        dispatch(Actions.getAchievements());
        dispatch(Actions.getCategories());
    }, [dispatch]);

    useEffect(() => {
        function getFilteredArray() {
            if (searchText.length === 0 && selectedCategory === "all") {
                console.log(achievements);
                return achievements;
            }

            return _.filter(achievements, item => {
                if (selectedCategory !== "all" && item.event_type.toLowerCase() !== selectedCategory.toLowerCase()) {
                    console.log(item.event_type, selectedCategory);
                    return false;
                }
                return item.event_title.toLowerCase().includes(searchText.toLowerCase())
            });
        }

        if (achievements) {
            setFilteredData(getFilteredArray());
        }
    }, [achievements, searchText, selectedCategory]);

    function handleSelectedCategory(category) {
        setSelectedCategory(category.target.value);
    }

    function handleSearchText(event) {
        setSearchText(event.target.value);
    }

    return (
        <div className="flex flex-col flex-1 w-full">
            <div
                className={clsx(classes.header, "relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                    <Typography color="inherit" className="text-24 sm:text-40 font-light">
                        Achievements
                    </Typography>
                </FuseAnimate>

                <FuseAnimate duration={400} delay={600}>
                    <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                        <span className="opacity-75">
                            Your achievements in various events that you participated.
                        </span>
                    </Typography>
                </FuseAnimate>

                <Icon className={classes.headerIcon}>airplanemode_active</Icon>
            </div>

            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
                    <TextField
                        label="Search for a event"
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
                                {filteredData.map((achievement) => {
                                    const category = categories.find(_cat => _cat.value.toLowerCase() === achievement.event_type.toLowerCase());
                                    return (
                                        <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={achievement.id}>
                                            <Card elevation={1} className="flex flex-col h-256">
                                                <div
                                                    className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                                                    style={{
                                                        background: category.color,
                                                        color: theme.palette.getContrastText(category.color)
                                                    }}
                                                >
                                                    <Typography className="font-medium truncate" color="inherit">{category.label}</Typography>
                                                    <div className="flex items-center justify-center opacity-75">
                                                        <Icon className="text-20 mr-8" color="inherit">date_range</Icon>
                                                        <div className="text-16 whitespace-no-wrap">{Math.floor(((new Date(achievement.end)) - (new Date(achievement.start))) / (1000 * 60 * 60 * 24))} days</div>
                                                    </div>
                                                </div>
                                                <CardContent className="flex flex-col flex-auto items-center justify-center">
                                                    {/* content of events here */}
                                                    <Typography className="text-center text-16 font-400">Position <Icon>directions_run</Icon> <h3>{achievement.position}</h3> in 
                                                    <Link
                                                        to={{ pathname: `/events/${achievement.event_id}/${achievement.event_title}`, state: { prevPath: window.location.pathname } }} // event page
                                                        component={Link}
                                                        className="justify-start px-3"
                                                        color="secondary"
                                                    >
                                                        {achievement.event_title}
                                                    </Link>
                                                    </Typography>
                                                    <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">{new Date(achievement.start).toDateString()} - {new Date(achievement.end).toDateString()}</Typography>
                                                </CardContent>
                                                <Divider />
                                                <CardActions className="justify-center">
                                                    {
                                                        achievement.certificate_uploaded?
                                                        (<Button
                                                            className="justify-start px-32"
                                                            color="secondary"
                                                        >
                                                           <a href={achievement.certificate} target='_blank'>
                                                                Certificate
                                                            </a>
                                                        </Button>)
                                                        :
                                                        (<Button
                                                            to={{ pathname: `/events/${achievement.event_id}/${achievement.event_title}`, state: { prevPath: window.location.pathname } }} // event page
                                                            component={Link}
                                                            className="justify-start px-32"
                                                            color="secondary"
                                                        >
                                                           View Event
                                                        </Button>)
                                                    }
                                                </CardActions>
                                                <LinearProgress
                                                    className="w-full"
                                                    variant="determinate"
                                                    value={0} // this can show the progress in event
                                                    color="secondary"
                                                />
                                            </Card>
                                        </div>
                                    )
                                })}
                            </FuseAnimateGroup>
                        ) :
                            (
                                <div className="flex flex-1 items-center justify-center">
                                    <Typography color="textSecondary" className="text-24 my-24">
                                        No achievements found!
                                    </Typography>
                                </div>
                            )
                    )), [categories, filteredData, theme.palette])}
            </div>
        </div>
    );
}

export default withReducer('user', reducer)(Achievements);
