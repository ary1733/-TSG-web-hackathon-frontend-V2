import React from 'react';
import {Redirect} from 'react-router-dom';

export const resultsEventsConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    routes  : [
        {
            path     : '/events/results/:courseId/:courseHandle?',
            component: React.lazy(() => import('./course/Course'))
        },
        {
            path     : '/events/results',
            component: React.lazy(() => import('./courses/Courses'))
        }
    ]
};
