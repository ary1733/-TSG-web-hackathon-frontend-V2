/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    tsg_official    : ['tsg_official'],
    society  : ['society'],
    student  : ['student'],
    loggedIn : ['admin', 'tsg_official', 'society', 'student'],
    officials: ['admin', 'tsg_official'],
    organisers: ['admin', 'tsg_official', 'society'],
    onlyGuest: []
};
/*
admin: 1
tsg_official: 2
society and cells: 3
students: 4
*/
export default authRoles;
