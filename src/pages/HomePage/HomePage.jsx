import { useState, useEffect } from "react"
import WorkspaceListUser from "../../components/WorkspaceListUser/WorkspaceListUser"
import * as workspacesAPI from '../../utilities/workspaces-api'

export default function HomePage({user}) {

    const [workspaces, setWorkspaces] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.userWorkspaces(user)))()
    }, [])


    return (
        <>
        <h1>Home</h1>
        <WorkspaceListUser workspaces={workspaces}/>
        
        </>
    )
}
