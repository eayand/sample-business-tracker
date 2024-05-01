import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as workspacesAPI from "../../utilities/workspaces-api"
import * as usersAPI from "../../utilities/users-api"
import UserList from "../../components/UserList/UserList"
import SignUpForm from "../../components/SignUpForm/SignUpForm";

export default function WorkspaceDetailPage() {
    const {id} = useParams()
    const [workspace, setWorkspace] = useState([])
    const [users, setUsers] = useState([])

    useEffect(function() {
        (async () => setWorkspace(await workspacesAPI.showWorkspace(id)))();
        (async () => setUsers(await usersAPI.listUsers()))();
    }, [])


    return (
        <>
        <h3>{workspace.name}</h3>
        <p>{workspace.description}</p>

        <UserList users={users} workspaceId={id}/>
     


        </>
    )
}