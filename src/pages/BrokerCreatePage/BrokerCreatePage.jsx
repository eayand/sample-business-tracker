import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as brokersAPI from '../../utilities/brokers-api'

export default function BrokerCreatePage({user}) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
        website: undefined,
        phone: undefined,
    })

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleSaveBroker(event) {
        event.preventDefault()
        await brokersAPI.saveBroker(form)
        navigate('/brokers')
    }

    return(
    <form className="big-form">
        <h3>Create a New Broker</h3>
      
            <input type="hidden" name="workspace" value={user.workspace[0]} />

            <label>Name of Company</label>
            <input name="name" value={form.name} onChange={handleChange} />
       
            <label>Website</label>
            <input name="website" value={form.website} onChange={handleChange} />

            <label>Primary Phone Number</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
     
        <div >
            <button type="submit" onClick={handleSaveBroker}>Create</button>
        </div>
    </form>
    )
}