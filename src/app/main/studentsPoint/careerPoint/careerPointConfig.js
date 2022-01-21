import React from 'react';
import {Redirect} from 'react-router-dom';

export const careerEventConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    routes  : [
        {
            path     : '/students-point/career-point/new',
            component: React.lazy(() => import('./careers/addCareer'))
        },
        {
            path     : '/students-point/career-point/view',
            component: React.lazy(() => import('./careers/careers'))
        },
        
    ]
};
