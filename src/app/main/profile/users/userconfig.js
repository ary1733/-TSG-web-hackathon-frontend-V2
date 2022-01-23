import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const userConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    auth    : authRoles.admin,
    routes  : [
        {
            path     : '/profile/update-users',
            component: React.lazy(() => import('./updateUsers'))
        }
    ]
};
