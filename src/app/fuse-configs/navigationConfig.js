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
                'type' : 'collapse',
                'icon' : 'event',
                'badge'   : {
                    'title': 2,
                    'bg'   : '#525E8A',
                    'fg'   : '#FFFFFF'
                },
                'children': [
                    {
                        'id'   : 'upcoming-events',
                        'title': 'Upcoming Events',
                        'type' : 'item',
                        'url'  : '/events/upcoming'
                    },
                    {
                        'id'   : 'Results',
                        'title': 'Results',
                        'type' : 'item',
                        'url'  : '/events/results'
                    }
                ]
            }
        ]
    }
];

export default navigationConfig;
