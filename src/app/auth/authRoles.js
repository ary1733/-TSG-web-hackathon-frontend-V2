/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['staff'],
    society  : ['society'],
    student  : ['student'],
    loggedIn : ['admin', 'staff', 'society', 'student'],
    officials: ['admin', 'staff'],
    organisers: ['admin', 'staff', 'society'],
    onlyGuest: []
};
/*
admin: 1
tsg_staff: 2
society and cells: 3
students: 4
*/
export default authRoles;
