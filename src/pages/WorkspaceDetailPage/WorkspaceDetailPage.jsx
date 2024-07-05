import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as workspacesAPI from "../../utilities/workspaces-api"
import * as usersAPI from "../../utilities/users-api"
import UserList from "../../components/UserList/UserList"
import UserListAvailable from "../../components/UserListAvailable/UserListAvailable";

export default function WorkspaceDetailPage() {
    const { id } = useParams()
    const [workspace, setWorkspace] = useState(null)
    const [users, setUsers] = useState(null)
    const [availableUsers, setAvailableUsers] = useState(null)
    const [edit, setEdit] = useState(false)

    const [form, setForm] = useState({
        name: undefined,
        customURL: undefined,
        description: undefined
    })

    useEffect(function () {
        (async () => setWorkspace(await workspacesAPI.showWorkspace(id)))();
        (async () => setUsers(await usersAPI.listUsers(id)))();
        (async () => setAvailableUsers(await usersAPI.indexNotInThisWorkspace(id)))();
    }, [])

    const toggleEdit = () => {
        setEdit(!edit)
    }

    useEffect(function () {
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
        const updatedWorkspace = await workspacesAPI.updateWorkspace(id, form)
        setWorkspace(updatedWorkspace)
        toggleEdit()
    }

    return workspace ? (
        <>
            {
                edit ?
                    <form className="flex flex-wrap m-8">
                        <div className="flex w-full m-8">
                            <label className="font-bold">Workspace Name</label><br />
                            <input name="name" value={form.name} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />
                        </div>
                        <div className="flex w-full m-8">
                            <label className="font-bold">Custom URL</label><br />
                            <input name="customURL" value={form.customURL} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />
                        </div>
                        <div className="flex w-full m-8">
                            <label className="font-bold">Workspace Description</label><br />
                            <textarea name="description" value={form.description} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />
                        </div>
                        <div className="ml-16">
                            <button type="submit" onClick={handleUpdateWorkspace}>Update</button>
                            <button onClick={toggleEdit}>Cancel</button>
                        </div>
                    </form>
                    :
                    <>
                        <div className="flex justify-center">
                            <div>
                                <h1 className="font-bold text-3xl m-8 mb-4">{workspace.name}</h1>
                                <p className="ml-8">{workspace.description}</p><br />
                            </div>

                            <div className="mt-12 mx-8">
                                <button onClick={toggleEdit} className="">Edit</button>
                            </div>
                        </div>

                        <div className="m-8">
                            <h3 className="font-bold text-xl mb-4">Users in This Workspace:</h3>
                            {
                                users ?
                                    <>
                                        <UserList users={users} id={id} setUsers={setUsers} availableUsers={availableUsers} setAvailableUsers={setAvailableUsers} />
                                        <br /><br />
                                    </>
                                    : null
                            }

                            <h3 className="font-bold text-xl mb-4">Other Users:</h3>
                            {
                                availableUsers ?
                                    <UserListAvailable availableUsers={availableUsers} id={id} setAvailableUsers={setAvailableUsers} users={users} setUsers={setUsers} />
                                    : null
                            }
                        </div>

                    </>
            }

        </>
    ) : null
}