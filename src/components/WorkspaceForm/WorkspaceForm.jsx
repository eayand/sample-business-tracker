import { useState } from 'react'
import * as workspacesAPI from '../../utilities/workspaces-api'

export default function WorkspaceForm({workspaces, setWorkspaces, users, setUsers}) {
    const [form, setForm] = useState({
        name: "",
        customURL: "",
        description: ""
    })

    const [error, setError] = useState(null)

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleSaveWorkspace(event) {
        event.preventDefault()
        const newWorkspace = await workspacesAPI.saveWorkspace(form)
        setWorkspaces([newWorkspace, ...workspaces])
        setUsers([users])
        setForm({
            name: "",
            customURL: "",
            description: ""
        })
    }

    return(
    <form
    className="text-center" >
        <div >
            <label className="block">Workspace Name</label>
            <input name="name" value={form.name} onChange={handleChange} maxLength="50"
            className="w-96 border border-theme px-2 py-1" />
        </div>
        <br />
        <div >
            <label className="block">Custom URL <span className="text-sm">letters and numbers only</span></label>
            <input name="customURL" value={form.customURL} onChange={handleChange} maxLength="50" pattern="[A-Za-z0-9]+"
            className="w-96 border border-theme px-2 py-1" />
        </div>
        <br />
        <div >
            <label className="block">Workspace Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} maxLength="100"
            className="w-96 border border-theme px-2 py-1" />
        </div>
        <br />
        <p>{error}</p>
        <div >
            <button type="submit" onClick={handleSaveWorkspace}>Create</button>
        </div>
    </form>
    )
}