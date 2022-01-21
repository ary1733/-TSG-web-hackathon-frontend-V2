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


function AddAcademic(props)
{
    const dispatch = useDispatch();
    const academic = useSelector(({acad}) => acad.add_academics);
    // const complaintId = props.department.pathname.split('/').at(-1);
    const user = useSelector(({auth}) => auth.user);
    const categories = useSelector(({acad}) => acad.current_academics.categories);
    
    const {form, handleChange, setForm} = useForm();

    useEffect(() => {
        dispatch(Actions.getCategories());
        dispatch(Actions.newacademic());
        // console.log(categories);
    }, [dispatch]);

    useEffect(() => {
        console.log(academic);
        if(!academic)
        {
            dispatch(Actions.newacademic());
            setForm(academic.data);
        }
        if (academic && !form)
        {
            setForm(academic.data);
        }

    }, [form, academic, setForm]);


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
            !_.isEqual(academic.data, form)
            && form.title.length > 0 && form.title.length <= 45
            && form.subjectcode.length <= 45
            && form.department.length > 0 && form.department.length <= 45
            && form.semester.length > 0 && form.semester.length <= 45
            && form.downloadLink.length <= 490 
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
                                    Academics
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.title ? form.title : 'New academic'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Academic Detail</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!canBeSubmitted()}
                                onClick={() => dispatch(Actions.saveacademic(form))}
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
                        <div id="academic-form">

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
                                label="Subject Name"
                                type="text"
                                value={form.title}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.title && form.title.length > 0 && form.title.length <= 45 ? false : true }
                                helperText={form.title && form.title.length > 0 ?form.title.length <= 45 ?"":"Max 45 characters allowed":"Name cannot be empty"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="subjectcode"
                                name="subjectcode"
                                onChange={handleChange}
                                label="Subject Code"
                                type="text"
                                value={form.subjectcode}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.subjectcode.length <=45? false : true }
                                helperText={form.subjectcode.length <= 45 ?"":"Max 45 characters allowed"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="department"
                                name="department"
                                onChange={handleChange}
                                label="Department"
                                type="text"
                                value={form.department}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.department && form.department.length > 0 && form.department.length <= 45 ? false : true }
                                helperText={form.department && form.department.length > 0 ?form.department.length <= 45 ?"":"Max 45 characters allowed":"Department cannot be empty"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="semester"
                                name="semester"
                                onChange={handleChange}
                                label="Semester"
                                type="text"
                                value={form.semester}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={form.semester && form.semester.length > 0 && form.semester.length <= 45 ? false : true }
                                helperText={form.semester && form.semester.length > 0 ?form.semester.length <= 45 ?"":"Max 45 characters allowed":"semester cannot be empty"}
                                fullWidth
                            />
                            <TextField
                                className="mt-8 mb-16"
                                id="downloadLink"
                                name="downloadLink"
                                onChange={handleChange}
                                label="Reference url"
                                type="text"
                                value={form.downloadLink}
                                multiline
                                rows={1}
                                variant="outlined"
                                error ={ form.downloadLink.length <= 490 ? false : true }
                                helperText={form.downloadLink.length <= 490 ?"":"Max 490 characters allowed"}
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

export default withReducer('acad', reducer)(AddAcademic);
