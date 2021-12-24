  const navigationConfig = [
    {
        'id'   : 'profile',
                'title': 'Profile',
                'type' : 'collapse',
                'icon' : 'account_circle',
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
                'type' : 'collapse',
                'icon' : 'event_emoji',
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
