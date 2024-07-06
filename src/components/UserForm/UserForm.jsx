import { useState } from "react"
import * as usersAPI from "../../utilities/users-api"

export default function UserForm({ users, setUsers }) {

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "readonly-employee",
        password: "",
        confirm: "",
    })

    const [error, setError] = useState(null)

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleCreateUser(event) {
        event.preventDefault()
        const newUser = await usersAPI.createViaAdmin(form)
        setUsers([newUser, ...users])
        setForm({
            firstName: "",
            lastName: "",
            email: "",
            role: "readonly-employee",
            password: "",
            confirm: "",
        })
    }

    return (
        <form className="flex">

            <div>

            <div className="flex flex-wrap gap-3">
                <div >
                    <label className="flex flex-col">First Name
                        <input required name="firstName" value={form.firstName} onChange={handleChange} maxLength="50"
                            className=" border border-theme px-2 py-1" /></label>
                </div>
                <br />
                <div >
                    <label className="flex flex-col">Last Name</label>
                    <input required name="lastName" value={form.lastName} onChange={handleChange} maxLength="50" pattern="[A-Za-z0-9]+"
                        className=" border border-theme px-2 py-1" />
                </div>
                <br />
                <div >
                    <label className="flex flex-col">Email</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} maxLength="100"
                        className=" border border-theme px-2 py-1" />
                </div>
                <br />
            </div>

            <div className="flex flex-wrap gap-3 mt-4">

                <div >
                    <label className="flex flex-col">Role</label>
                    <select name="role" value={form.role} onChange={handleChange}
                        className=" border border-theme px-2 py-1 max-w-max">
                        <option value="readonly-employee">Read-Only Employee</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <br />
                <div >
                    <label className="flex flex-col">Password</label>
                    <input required type="password" name="password" value={form.password} onChange={handleChange} maxLength="100"
                        className=" border border-theme px-2 py-1" />
                </div>
                <br />
                <div >
                    <label className="flex flex-col">Confirm</label>
                    <input required type="password" name="confirm" value={form.confirm} onChange={handleChange} maxLength="100"
                        className=" border border-theme px-2 py-1" />
                </div>
                <br />
            </div>

            </div>

            <p>{error}</p>
            <div className="m-auto">
                <button type="submit" onClick={handleCreateUser} className="m-4">Create</button>
            </div>
        </form>
    )

}