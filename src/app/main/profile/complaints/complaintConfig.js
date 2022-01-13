import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const complaintConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    auth    : authRoles.loggedIn,
    routes  : [
        {
            path     : '/profile/complaints/all',
            component: React.lazy(() => import('./orders/Orders'))
        },
        {
            path     : '/profile/complaints/:Id',
            component: React.lazy(() => import('./complaint/Complaint'))
        }
    ]
};
