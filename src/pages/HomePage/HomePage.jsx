import { useState, useEffect } from "react"
import WorkspaceListUser from "../../components/WorkspaceListUser/WorkspaceListUser"
import * as workspacesAPI from '../../utilities/workspaces-api'

export default function HomePage({user}) {

    const [workspaces, setWorkspaces] = useState([])

    useEffect(function() {
        (async () => setWorkspaces(await workspacesAPI.userWorkspaces(user)))()
    }, [user])


    return workspaces[0] ? (
        <>
        <h1>Home</h1>
        <WorkspaceListUser workspaces={workspaces}/>
        
        </>
    ) : (
        <>
        <h1>Home</h1>
        <h3>Your admin must assign you to a workspace before you can start.</h3>
        </>

    )
}
