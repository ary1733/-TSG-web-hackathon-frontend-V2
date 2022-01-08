 import { authRoles } from "app/auth";
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
                        'url'  : '/profile/achievements',
                        'auth' : authRoles.student
                    },
                    {
                        'id'   : 'complaints',
                        'title': 'Complaints',
                        'type' : 'collapse',
                        'auth' : authRoles.loggedIn,
                        'children': [
                            {
                                'id'   : 'add-complaints',
                                'title': 'New Complaint',
                                'type' : 'item',
                                'url'  : '/profile/complaints/new',
                                'auth' : authRoles.loggedIn
                            }
                        ]
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
    },
    {
        'id'   : 'studentspoint',
                'title': "Students\' Point",
                'type' : 'collapse',
                'icon' : 'school',
                'badge'   : {
                    'title': 3,
                    'bg'   : '#525E8A',
                    'fg'   : '#FFFFFF'
                },
                'auth' : authRoles.loggedIn,
        'children': [
            {
                'id'   : 'academic-point',
                'title': 'Academic Point',
                'type' : 'item',
                'url'  : '/students-point/academic-point'
            },
            {
                'id'   : 'career-point',
                'title': 'Career Point',
                'type' : 'item',
                'url'  : '/students-point/career-point'
            }
        ]
    }
];

export default navigationConfig;
