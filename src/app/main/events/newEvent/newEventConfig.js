import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const newEventsConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    auth    : authRoles.officials,
    routes  : [
        {
            path     : '/events/new',
            component: React.lazy(() => import('./Event'))
        }
    ]
};
