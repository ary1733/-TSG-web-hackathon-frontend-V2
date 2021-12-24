  const navigationConfig = [
    {
        'id'   : 'profile',
                'title': 'Profile',
                'type' : 'group',
                'icon' : 'account',
                'badge'   : {
                    'title': 1,
                    'bg'   : '#525E8A',
                    'fg'   : '#FFFFFF'
                },
        'children': [
                    {
                        'id'   : 'achievements',
                        'title': 'Achievements',
                        'type' : 'item',
                        'url'  : '/profile/achievements'
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
