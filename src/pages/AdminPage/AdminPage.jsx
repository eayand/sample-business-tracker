import { useState, useEffect } from 'react'
import * as workspacesAPI from '../../utilities/workspaces-api'
import * as usersAPI from '../../utilities/users-api'
import Box from '../../components/Box/Box'
import WorkspaceForm from '../../components/WorkspaceForm/WorkspaceForm'
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList'
import UserTable from '../../components/UserTable/UserTable'
import UserForm from '../../components/UserForm/UserForm'

export default function AdminPage({user}) {
    const [workspaces, setWorkspaces] = useState([])
    const [users, setUsers] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.listWorkspaces()))()
    }, [])

    useEffect(function() {
        (async () => setUsers(await usersAPI.listAllUsers()))()
    }, [])


    return(
        < div className="flex flex-col justify-center sm:mx-10">
        <h1
        className="css-lg w-full text-center py-8" >
            Admin Home
        </h1>

        <div className="flex flex-wrap px-10 justify-center">


            <Box title="Your Workspaces" 
                contents={ workspaces.length ? 
                    <WorkspaceList workspaces={workspaces} />
                    : 
                    <p>Create a workspace to start adding users.</p>
                }
            />
            
            <Box title="Create a Workspace" 
            contents={<WorkspaceForm workspaces={workspaces} setWorkspaces={setWorkspaces} users={users} setUsers={setUsers} />}/>

            <Box title="Create a User" 
            contents={<UserForm users={users} setUsers={setUsers}/>}
            />

            <Box title="All Users"  
                contents={users.length ? 
                    <UserTable users={users} />
                    : 
                    null}
            />

        </div>

        </div>
    )
}