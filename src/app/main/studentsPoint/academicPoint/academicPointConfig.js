import React from 'react';
import {Redirect} from 'react-router-dom';

export const academicEventConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    routes  : [
        // {
        //     path     : '/students-point/academic-point/update/:academicid',
        //     component: React.lazy(() => import('./academics/updateCareer'))
        // },
        {
            path     : '/students-point/academic-point/new',
            component: React.lazy(() => import('./academics/addAcademic'))
        },
        {
            path     : '/students-point/academic-point/view',
            component: React.lazy(() => import('./academics/Academics'))
        },
        
    ]
};
