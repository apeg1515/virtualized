import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import permissions from './allPermissions';
import users from './allUsers';
import MultiGridExample from  './Virtualization';
//import AppBar from './AppBar';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import { reshapeUsersRoles } from './VirtualizedHelpers';
import allRolesData from './allRoles';
//import GridExample from './Table';
import permissionsData from './allPermissions';
import usersData from './allUsers';
//import FilterColumns from './FilterColumns';
import ListComponent from './ListComponent';
import VirtualizedUserRoleTable from './VirtualizedUserRoleTable';

const allPermissions = permissionsData();

const allUsers = usersData();

const allRoles = allRolesData().map((role) => ({ id: role.id, name: role.name }));


class App extends Component {
    state = {
     updateCount: 0,
     statefulUsers: allUsers,
     statefulPermissions: allPermissions,
     statefulRoles: allRolesData(),
  };

  updateMethod = ()=> {
    console.log('clicked');

    const newUser =  {
        "id": 312,
        "username": "AAA",
        "displayname": "AAnuel",
        "email": null,
        "lastlogin": null,
        "sandbox_id": 27,
        "disabled": false,
        "session_id": null,
        "createdAt": "2018-08-21T12:49:54.153Z",
        "updatedAt": "2018-08-21T12:49:54.153Z",
        "roles": []
    };

    const updateCount = this.state.updateCount + 1;
    const statefulUsers = [ ...this.state.statefulUsers ];
    statefulUsers.unshift(newUser);

    this.setState({
        updateCount,
        statefulUsers
    });
  };

  
  render() {

    return (
        <div>
 
          <div className="row" style={{ marginTop: '5%'}}>


            <div className="col-xs-12" style={{ paddding: 5}}>
                {/*<ListComponent list={data} />*/}
                <VirtualizedUserRoleTable 
                    allusers={this.state.statefulUsers}
                    allroles={this.state.statefulRoles}
                    updateCount={this.state.updateCount}
                    assignRole={this.assignRole}
                    unassignRole={this.unassignRole}/>
            </div>
            
          </div>
        </div>
    );
  }
}
export default App;
