import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import LoginPage from 'app/main/login/LoginPage';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { EventsConfig } from 'app/main/events/EventsConfig';
import { profileConfig} from 'app/main/profile/profleConfig';
import { studentsPointConfig } from 'app/main/studentsPoint/studentsPointConfig';


const routeConfigs = [
    LoginConfig,
    ...EventsConfig,
    ...profileConfig,
    ...studentsPointConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/', 
        exact:true,
        component: () => <Redirect to="/events/upcoming"/>
    },
    {
        path     : '/profile/complaints', 
        exact:true,
        component: () => <Redirect to="/profile/complaints/all"/>
    }
];

export default routes;
