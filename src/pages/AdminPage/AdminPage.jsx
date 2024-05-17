import { useState, useEffect } from 'react'
import Box from '../../components/Box/Box'
import * as workspacesAPI from '../../utilities/workspaces-api'
import WorkspaceForm from '../../components/WorkspaceForm/WorkspaceForm'
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList'
import * as usersAPI from '../../utilities/users-api'
import UserTable from '../../components/UserTable/UserTable'

export default function AdminPage() {
    const [workspaces, setWorkspaces] = useState([])
    const [users, setUsers] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.listWorkspaces()))()
    }, [])

    useEffect(function() {
        (async () => setUsers(await usersAPI.listAllUsers()))()
    }, [])


    return(
        <>
        <h1
        className="css-lg w-full text-left px-10 py-3" >
            Admin Home
        </h1>

        <div className="flex flex-wrap px-10">


            <Box title="Your Workspaces" 
                contents={ workspaces.length ? 
                    <WorkspaceList workspaces={workspaces} />
                    : 
                    <p>Create a workspace to start adding users.</p>
                }
            />
            
            <Box title="Create a Workspace" 
            contents={<WorkspaceForm workspaces={workspaces} setWorkspaces={setWorkspaces} />}/>

            <Box title="All Users"  
                contents={users.length ? 
                    <UserTable users={users} />
                    : 
                    null}
            />

        </div>

        </>
    )
}