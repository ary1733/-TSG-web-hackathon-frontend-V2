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
                                'id'   : 'all-complaints',
                                'title': 'View Complaints',
                                'type' : 'item',
                                'url'  : '/profile/complaints/all',
                                'auth' : authRoles.loggedIn
                            },
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
                'id'   : 'new-event',
                'title': 'New Event',
                'type' : 'item',
                'url'  : '/events/new',
                'auth' : authRoles.officials
            },
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
                        'id'   : 'academics',
                        'title': 'Academics',
                        'type' : 'collapse',
                        'auth' : authRoles.loggedIn,
                        'children': [
                            {
                                'id'   : 'academic-point',
                                'title': 'Academic Point',
                                'type' : 'item',
                                'url'  : '/students-point/academic-point/view'
                            },
                            {
                                'id'   : 'add-academic-point',
                                'title': 'Add Academic',
                                'type' : 'item',
                                'url'  : '/students-point/academic-point/new'
                            }
                        ]
                        
                    }
                    ,
                    {
                        'id'   : 'careers',
                        'title': 'Careers',
                        'type' : 'collapse',
                        'auth' : authRoles.loggedIn,
                        'children': [
                            {
                                'id'   : 'career-point',
                                'title': 'Career Point',
                                'type' : 'item',
                                'url'  : '/students-point/career-point/view'
                            },
                            {
                                'id'   : 'add-career-point',
                                'title': 'Add Career',
                                'type' : 'item',
                                'url'  : '/students-point/career-point/new'
                            }
                        ]        
                    }
        ]
    }
];

export default navigationConfig;
