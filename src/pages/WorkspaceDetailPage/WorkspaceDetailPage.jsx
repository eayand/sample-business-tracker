import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as workspacesAPI from "../../utilities/workspaces-api"
import * as usersAPI from "../../utilities/users-api"
import UserList from "../../components/UserList/UserList"
import UserListAvailable from "../../components/UserListAvailable/UserListAvailable";

export default function WorkspaceDetailPage() {
    const {id} = useParams()
    const [workspace, setWorkspace] = useState(null)
    const [users, setUsers] = useState(null)
    const [availableUsers, setAvailableUsers] = useState(null)
    const [edit, setEdit] = useState(false)

    const [form, setForm] = useState({
        name: undefined,
        customURL: undefined,
        description: undefined
    })

    useEffect(function() {
        (async () => setWorkspace(await workspacesAPI.showWorkspace(id)))();
        (async () => setUsers(await usersAPI.listUsers(id)))();
        (async () => setAvailableUsers(await usersAPI.listAvailableUsers(id)))();
    }, [])

    const toggleEdit = () => {
        setEdit(!edit)
    }

    useEffect(function() {
        setForm(workspace)
    }, [workspace])

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleUpdateWorkspace(event) {
        event.preventDefault()
        await workspacesAPI.updateWorkspace(id, form)
        toggleEdit()
    }

    return workspace ? (
        <>
        <h1>{workspace.name}</h1>
        <p>{workspace.description}</p><br />

        {
        edit ? 
        <form className="flex-ctr-ctr flex-col workspace-form">
            <div >
                <label>Workspace Name</label><br />
                <input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div >
                <label>Custom URL</label><br />
                <input name="customURL" value={form.customURL} onChange={handleChange} />
            </div>
            <div >
                <label>Workspace Description</label><br />
                <textarea name="description" value={form.description} onChange={handleChange} />
            </div>
            <div>
                <button type="submit" onClick={handleUpdateWorkspace}>Update</button>
                <button onClick={toggleEdit}>Cancel</button>
            </div>
        </form>
        :
        <>
        <div className="flex-j-end full-width relative">
            <button onClick={toggleEdit} className="detail-edit-button">Edit</button>
        </div>  

        <h3>Users in This Workspace:</h3>
        {
            users ?
            <>
        <UserList users={users} id={id}/>
        <br /><br />
        </>
        : null
        }

        <h3>Other Users:</h3>
        {
            availableUsers ?
            <UserListAvailable availableUsers={availableUsers} id={id} />
            : null
        }

        </>
        }

        </>
    ) : null
}