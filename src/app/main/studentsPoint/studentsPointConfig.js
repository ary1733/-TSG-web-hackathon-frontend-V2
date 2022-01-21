import { authRoles } from 'app/auth';
import React from 'react'
import { academicEventConfig } from './academicPoint/academicPointConfig';
import { careerEventConfig } from './careerPoint/careerPointConfig';

export const studentsPointConfig = [
    careerEventConfig,
    academicEventConfig,
    {
    settings: {
        layout: {
            style : 'layout1', // layout-1 layout-2 layout-3
            config: {} // checkout layout configs at app/fuse-configs/layout-1/Layout1Config.js
        }
    },
    auth    : authRoles.loggedIn, // makes the route visible only for logged in
    routes  : [
        {
            path     : '/students-point',
            component: React.lazy(() => import('./StudentsPoint'))
        }
    ]
}];
// export const studentsPointConfig = {
//     settings: {
//         layout: {
//             config: {}
//         }
//     },
//     auth    : authRoles.loggedIn, // makes the route visible only for logged in
//     routes  : [
//         // {
//         //     path     : '/students-point/career-point',
//         //     component: React.lazy(()=>import('./careerPoint/careerPoint'))
//         // },
//         {
//             path     : '/students-point/notes',
//             component: React.lazy(()=>import('./tabbed'))
//         }
//         //,
//         // {
//         //     path     : '/students-point/academic-point',
//         //     component: React.lazy(()=>import('./academicPoint/academicPoint'))
//         // }

//     ]
// };

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
