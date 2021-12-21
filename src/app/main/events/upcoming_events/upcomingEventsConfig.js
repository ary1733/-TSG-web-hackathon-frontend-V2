import React from 'react';
import {Redirect} from 'react-router-dom';

export const upcomingEventsConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    routes  : [
        {
            path     : '/events/upcoming/:courseId/:courseHandle?',
            component: React.lazy(() => import('./course/Course'))
        },
        {
            path     : '/events/upcoming',
            component: React.lazy(() => import('./courses/Courses'))
        }
    ]
};
