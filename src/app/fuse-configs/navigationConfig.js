  const navigationConfig = [
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
