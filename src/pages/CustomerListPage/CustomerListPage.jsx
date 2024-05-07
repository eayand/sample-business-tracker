import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'
import CustomerTable from "../../components/CustomerTable/CustomerTable";


export default function CustomerListPage({user}) {
    
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
    })

    useEffect(function() {
        (async () => setCustomers(await customersAPI.listCustomers()))()
    }, [] )

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleCreateCustomer(event) {
        event.preventDefault()
        const customer = await customersAPI.createCustomer(form)
        const customerId = customer._id
        navigate(`/customers/${customerId}`)
    }

    return (
        <>
        <div className="flex-between">
            <h1>Customers </h1>
            <form className="flex-ctr-ctr">
                <input type="hidden" name="workspace" value={user.workspace[0]} required/>
                <input name="name" value={form.name} onChange={handleChange} required className="inline-input"/>
                <button type="submit" onClick={handleCreateCustomer}>Create New Customer</button>
            </form>
        </div>

        <div className="chart-container">
            <CustomerTable customers={customers}/>
        </div>

        </>
        
    )
}