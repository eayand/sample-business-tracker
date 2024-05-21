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

        <div className="m-8 flex gap-2">
            <div className="h-24 w-24 bg-white">white</div>
            <div className="h-24 w-24 bg-gray-400">gray-400</div>
            <div className="h-24 w-24 bg-theme text-white">theme</div>
            <div className="h-24 w-24 bg-lightgreen">lightgreen</div>
            <div className="h-24 w-24 bg-lightblue">lightblue</div>
            <div className="h-24 w-24 bg-lightyellow">lightyellow</div>
            <div className="h-24 w-24 bg-bluetext">bluetext</div>
            <div className="h-24 w-24 bg-yellowtext">yellowtext</div>
            <div className="h-24 w-24 bg-interactable">interactable</div>
            <div className="h-24 w-24 bg-hover">hover</div>
            <div className="h-24 w-24 bg-brightblue">brightblue</div>
            <div className="h-24 w-24 bg-green">green</div>
            <div className="h-24 w-24 bg-red">red</div>
        </div>

        </>
    )
}