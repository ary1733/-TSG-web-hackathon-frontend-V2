import React from 'react';
import {Redirect} from 'react-router-dom';
import {authRoles} from 'app/auth';

export const newsConfig = {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    auth    : authRoles.organisers,
    routes  : [
        {
            path     : '/news/mail-news',
            component: React.lazy(() => import('./mailNews'))
        }
    ]
};
