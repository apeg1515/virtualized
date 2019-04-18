/*
 @helper functions for virtualized table
*/

const mergePermissions = allUsers => allUsers

    .map((user) => (

        user.roles.length !== 0 ?

            ({ ...user, roles: user.roles.reduce((acc, key) => acc.concat(key.permissions),[]) }) 

            : ({ ...user })

    ));


const mergeRoles = allUsers => allUsers

    .map((user) => (

        user.roles.length !== 0 ?

        ({ ...user, roles: user.roles.map(role => ({roleid: role.id})) })

        : ({ ...user })

    ));


export const reshapeUsers = (allUsers, allPermissions) => 

    mergePermissions(allUsers).reduce((acc, user) => {

    if(Boolean(user.roles.length)) {

        const thisUser = user.roles.map((permission) => 
            ({   
                roleperm: allPermissions.filter(p => p.id === permission.id)[0], 
                checked: true 
            })
        );

        acc.push({ 
            id: user.id, 
            username: user.username, 
            displayname: user.displayname, 
            roles: thisUser, 
            permissionState: true 
        });

    } else {

        acc.push({ 
            id: user.id, 
            username: user.username, 
            displayname: user.displayname, 
            roles: allPermissions, 
            permissionState: false,
        });

    }

    return acc;

  }, []);


export const reshapePermissions = (allUsers, allPermissions) => allUsers

    .map((user) => {

        if(user.permissionState) {

            const Arr = [];

            const Ids = user.roles.map(usr => usr.roleperm.id);

            allPermissions.map((permission) => {

                const perm = Ids.filter(id =>  id === permission.id ? true : false )[0]; 

                Arr.push({ 
                    ... permission, 
                    checked: (perm !== undefined ? true : false), 
                    userId: user.id 
                });

            });

            return ({ ...user, roles: Arr });

        } else {

            const permissions = allPermissions.map(permission => ({ 
                ...permission, 
                checked: false, 
                userId: user.id 
            }));

            return ({ ...user, roles: permissions });
        }

    });


export const reshapeUserRoles = (allUsers, allRoles) => 

    mergeRoles(allUsers).reduce((acc, user) => {

    if(Boolean(user.roles.length)) {

        const thisUser = user.roles.map((role) => 
            ({   
                roleperm: allRoles.filter(p => p.id === role.roleid)[0], 
                checked: true,
            })
        );

        acc.push({ 
            id: user.id, 
            username: user.username, 
            displayname: user.displayname, 
            roles: thisUser, 
            roleState: true 
        });

    } else {

        acc.push({ 
            id: user.id, 
            username: user.username, 
            displayname: user.displayname, 
            roles: allRoles, 
            roleState: false,
        });

    }

    return acc;

  }, []);


export const reshapeRoles = (allUsers, allRoles) => allUsers

    .map((user) => {

        if(user.roleState) {

            const Arr = [];

            const Ids = user.roles.map(usr => usr.roleperm.id);

            allRoles.map((role) => {

                const perm = Ids.filter(id =>  id === role.id ? true : false )[0]; 

                Arr.push({ 
                    ... role, 
                    checked: (perm !== undefined ? true : false), 
                    userId: user.id 
                });

            });

            return ({ ...user, roles: Arr });

        } else {

            const _roles = allRoles.map(role => ({ 
                ...role, 
                checked: false, 
                userId: user.id 
            }));

            return ({ ...user, roles: _roles });
        }

    });