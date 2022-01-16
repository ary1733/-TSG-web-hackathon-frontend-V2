import React, {useEffect, useState} from 'react';
import {Button,  TextField, Icon, Typography, Select, OutlinedInput, MenuItem, InputLabel} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, OutlinedDiv } from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';


function AddCareer(props)
{
    const dispatch = useDispatch();
    const career = useSelector(({user}) => user.add_career);
    // const complaintId = props.location.pathname.split('/').at(-1);
    const user = useSelector(({auth}) => auth.user);
    const categories = useSelector(({user}) => user.current_careers.categories);
    
    const {form, handleChange, setForm} = useForm();

    useEffect(() => {
        dispatch(Actions.getCategories());
    }, [dispatch]);

    useEffect(() => {
        if(!career.data)
        {
            dispatch(Actions.newcomplaint());
            setForm(career.data);
        }
        if (career.data && !form)
        {
            setForm(career.data);
        }
    }, [form, career.data, setForm, career.reset]);


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
            !_.isEqual(career.data, form)
            && form.title.length > 0 && form.title.length <= 25
            && form.jobprofile.length > 0 && form.jobprofile.length <= 40
            && form.location.length > 0 && form.location.length <= 40
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
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="view" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Careers
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.title ? form.title : 'New career'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Career Detail</Typography>
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
            
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <div id="career-form">

                           {/* <TextField
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                defaultValue="2017-05-24T10:30"
                                sx={{ width: 250 }}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            /> 
                            <TextField
                                className="mt-8 mb-16"
                                id="date"
                                name="date"
                                onChange={handleChange}
                                type="date"
                                value={form.date}
                                variant="outlined"
                                fullWidth
                            /> */}

                            <TextField
                                className="mt-8 mb-16"
                                id="title"
                                name="title"
                                onChange={handleChange}
                                label="Company Name"
                                type="text"
                                value={form.title}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.title && form.title.length > 0 && form.title.length <= 25 ? false : true }
                                helperText={form.title && form.title.length > 0 ?form.title.length <= 25 ?"":"Max 25 characters allowed":"Name cannot be empty"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="jobprofile"
                                name="jobprofile"
                                onChange={handleChange}
                                label="Job Description"
                                type="text"
                                value={form.jobprofile}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.jobprofile && form.jobprofile.length > 0 && form.jobprofile.length <= 40 ? false : true }
                                helperText={form.jobprofile && form.jobprofile.length > 0 ?form.jobprofile.length <= 40 ?"":"Max 40 characters allowed":"Description cannot be empty"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="location"
                                name="location"
                                onChange={handleChange}
                                label="Location"
                                type="text"
                                value={form.location}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.location && form.location.length > 0 && form.location.length <= 40 ? false : true }
                                helperText={form.location && form.location.length > 0 ?form.location.length <= 40 ?"":"Max 40 characters allowed":"Location cannot be empty"}
                                fullWidth
                            />
                            <InputLabel htmlFor="category-label-placeholder">
                                Category
                            </InputLabel>
                            <Select
                                className="mt-8 mb-16"
                                id = "type"
                                name = "type"
                                label = "type"
                                value = {form.type}
                                onChange={handleChange}
                                input={
                                    <OutlinedInput
                                        // labelWidth={("category".length * 9)}
                                        name="category"
                                        id="category-label-placeholder"
                                        fullWidth
                                        rows={1}
                                    />
                                }
                                
                            >
                                {categories.map(category => (
                                    <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                                ))}
                            </Select>
                                
                            <OutlinedDiv label="Attachment (PDF)">
                                <input
                                    // className="hidden"
                                    id="attachment"
                                    type="file"
                                    name="attachment"
                                    accept="application/pdf"
                                    onChange={handleUploadChange}
                                />
                            </OutlinedDiv>

                        </div>
        
                    </div>
                )
            }
            
        />
    )
}

export default withReducer('user', reducer)(AddCareer);
