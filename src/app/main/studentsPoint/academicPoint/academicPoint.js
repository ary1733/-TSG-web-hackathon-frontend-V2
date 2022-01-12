import React, {useState} from 'react';
import {FusePageSimple, DemoContent} from '@fuse';

import {Tab, Tabs, TextField, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
const AcadDemoData = [
    {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Advanced%20Ground%20Water%20Hydrology.pdf",
        "Paper": "Advanced Ground Water Hydrology",
        "Semester": "",
        "Year": "2000"
    },
    {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Agri%20Finance%20and%20Marketing.pdf",
        "Paper": "Agri Finance and Marketing",
        "Semester": "",
        "Year": "2000"
    },
    {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Agricultural%20Biotechnology.pdf",
        "Paper": "Agricultural Biotechnology",
        "Semester": "",
        "Year": "2000"
    },
    {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Alternative%20Energy%20Sources.pdf",
        "Paper": "Alternative Energy Sources",
        "Semester": "",
        "Year": "2000"
    }, {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Crop%20Breeding%20and%20Biotechnologica%20Applications.pdf",
        "Paper": "Crop Breeding and Biotechnologica Applications",
        "Semester": "",
        "Year": "2000"
    }, {
        "Department": "Agriculture",
        "Link": "https://static.metakgp.org/peqp/2000/Agriculture/Dairy%20and%20Food%20Product%20Technology.pdf",
        "Paper": "Dairy and Food Product Technology"
    }
]

const useStyles = makeStyles(theme => ({
    header    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : 'absolute',
        top          : -64,
        left         : 0,
        opacity      : .04,
        fontSize     : 512,
        width        : 512,
        height       : 512,
        pointerEvents: 'none'
    }
}));

function AcademicPoint()
{
    const classes = useStyles();
    

    return (
        <FusePageSimple
            classes={{
                root   : classes.layoutRoot,
                toolbar: "px-16 sm:px-24"
            }}
            header={
                <div className="p-24">
                    <h4 style={{ flex: 1 }}>Academic Point</h4>
                    <TextField
                        id="search-document"
                        label="search"
                        // className={classes.textField}
                        // value={values.name}
                        // onChange={handleChange('name')}
                        fullWidth
                        margin="normal"
                    />
                </div>
            }
            
            content={
                <div className="flex flex-col w-full items-center">
                        
                </div>
            }
        />
    )
}

export default AcademicPoint;
