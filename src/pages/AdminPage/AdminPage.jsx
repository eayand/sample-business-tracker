import { useState, useEffect } from 'react'
import * as workspacesAPI from '../../utilities/workspaces-api'
import WorkspaceForm from '../../components/WorkspaceForm/WorkspaceForm'
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList'
import { getUser } from '../../utilities/users-service'

export default function AdminPage() {
    const user = getUser()
    const [workspaces, setWorkspaces] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.listWorkspaces(user)))()
    }, [])

    return(
        <>
        <h1>Admin Home</h1>
        <div className="flex">
            <WorkspaceForm workspaces={workspaces} setWorkspaces={setWorkspaces} />
            
                { workspaces.length ? 
                    <WorkspaceList workspaces={workspaces} />
                : 
                    <p>Create a workspace to start adding users.</p>
                }
            
        </div>
        </>
    )
}