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
            }
        ]
    },
    {
        'id'   : 'events',
                'title': 'Events @IITKgp',
                'type' : 'group',
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
                'id'   : 'current-events',
                'title': 'Current Events',
                'type' : 'item',
                'url'  : '/events/current'
            },
            {
                'id'   : 'Results',
                'title': 'Results',
                'type' : 'item',
                'url'  : '/events/results'
            }
        ]
    }
];

export default navigationConfig;
