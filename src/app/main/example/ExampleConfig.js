import Example from './Example';
import { authRoles } from 'app/auth';
export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    auth    : authRoles.student, // makes the route visible only for students and above
    routes  : [
        {
            path     : '/example',
            exact: true,
            component: Example
        },

    ]
};

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
