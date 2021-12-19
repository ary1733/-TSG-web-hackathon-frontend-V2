import {AcademyAppConfig} from "../main/academy/AcademyAppConfig"  
const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'   : 'example-component',
                'title': 'Example',
                'type' : 'item',
                'icon' : 'whatshot',
                'url'  : '/example'
            },
            {
                'id'   : 'events',
                'title': 'Events @IITKgp',
                'type' : 'item',
                'icon' : 'event',
                'url'  : AcademyAppConfig.routes[1].path
            }
        ]
    }
];

export default navigationConfig;
