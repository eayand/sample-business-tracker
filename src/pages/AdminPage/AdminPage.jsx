import { useState, useEffect } from 'react'
import * as workspacesAPI from '../../utilities/workspaces-api'
import WorkspaceForm from '../../components/WorkspaceForm/WorkspaceForm'
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList'
import { getUser } from '../../utilities/users-service'
import Box from '../../components/Box/Box'

export default function AdminPage() {
    const user = getUser()
    const [workspaces, setWorkspaces] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.listWorkspaces(user)))()
    }, [])

    return(
        <>
        <h1
        className="css-lg w-full text-left px-10 py-3" >
            Admin Home
        </h1>

        <div className="flex flex-wrap px-10">

            <Box title="Create a Workspace" contents={<WorkspaceForm workspaces={workspaces} setWorkspaces={setWorkspaces} />}/>

            <Box title="Your Workspaces" 
                contents={ workspaces.length ? 
                    <WorkspaceList workspaces={workspaces} />
                : 
                    <p>Create a workspace to start adding users.</p>
                }
            />
            
        </div>

        </>
    )
}