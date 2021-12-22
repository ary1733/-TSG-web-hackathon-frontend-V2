/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'staff'],
    society  : ['admin', 'staff', 'society'],
    student  : ['admin', 'staff', 'society', 'student'],
    onlyGuest: []
};
/*
admin: 1
tsg_staff: 2
society and cells: 3
students: 4
*/
export default authRoles;
