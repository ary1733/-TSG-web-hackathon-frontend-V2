import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse';
import {ExampleConfig} from 'app/main/example/ExampleConfig';
import LoginPage from 'app/main/login/LoginPage';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { EventsConfig } from 'app/main/events/EventsConfig';

const routeConfigs = [
    ExampleConfig,
    LoginConfig,
    ...EventsConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/', 
        exact:true,
        component: () => <Redirect to="/example"/>
    }
   
];

export default routes;
