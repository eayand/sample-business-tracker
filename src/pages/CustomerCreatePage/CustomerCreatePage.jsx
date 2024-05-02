import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerCreatePage({user}) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
        website: undefined,
        phone: undefined,
        tax: undefined,
        address: undefined,
        joined: undefined,
        renewal: '',
        commission1: undefined,
        commission2: undefined,
        accountManager: undefined,
        broker: undefined,
    })

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleCreateCustomer(event) {
        event.preventDefault()
        await customersAPI.createCustomer(form)
        navigate('/customers')
    }

    return(
    <form className="big-form">
        <h3>Create a New Customer</h3>
      
            <input type="hidden" name="workspace" value={user.workspace[0]} />

            <label>Name of Company</label>
            <input name="name" value={form.name} onChange={handleChange} />
       
            <label>Website</label>
            <input name="website" value={form.website} onChange={handleChange} />

            <label>Primary Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />

            <label>Tax ID</label>
            <input name="tax" value={form.tax} onChange={handleChange} />

            <label>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} />

            <label>Joined</label>
            <input type="date" name="joined" value={form.joined} onChange={handleChange} />

            <label>Renewal</label>
            <input name="renewal" value={form.renewal} onChange={handleChange} />

            <label>Broker Commission 1</label>
            <input type="number" name="commission1" value={form.commission1} onChange={handleChange} />

            <label>Broker Commission 2</label>
            <input type="number" name="commission2" value={form.commission2} onChange={handleChange} />

            <label>Account Manager</label>
            <input name="accountManager" value={form.accountManager} onChange={handleChange} />

            <label>Broker</label>
            <input name="broker" value={form.broker} onChange={handleChange} />
     
        <div >
            <button type="submit" onClick={handleCreateCustomer}>Create</button>
        </div>
    </form>
    )
}