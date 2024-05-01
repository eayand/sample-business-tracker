import { useState } from 'react'
import * as workspacesAPI from '../../utilities/workspaces-api'

export default function WorkspaceForm({workspaces, setWorkspaces}) {
    const [form, setForm] = useState({
        name: "",
        description: ""
    })

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
        setForm({
            name: "",
            description: ""
        })
    }

    return(
    <form className="admin-form">
        <p>Create a Workspace</p>
        <div >
            <label>Workspace Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div >
            <label>Workspace Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} />
        </div>
        <div >
            <button type="submit" onClick={handleSaveWorkspace}>Create</button>
        </div>
    </form>
    )
}