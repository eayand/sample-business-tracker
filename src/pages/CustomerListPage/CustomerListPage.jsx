import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'
import CustomerCreatePage from "../../pages/CustomerCreatePage/CustomerCreatePage"
import CustomerList from "../../components/CustomerList/CustomerList";


export default function CustomerListPage({user}) {
    const [customers, setCustomers] = useState([])
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
    })
    // const [goTo, setGoTo] = useState('')

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
        await customersAPI.createCustomer(form)
        //add redirect to newly created customer's detail page
    }

    return (
        <>
        <h1 className="align-left">Customers <span>
            <input type="hidden" name="workspace" value={user.workspace[0]} />
            <input name="name" value={form.name} onChange={handleChange} />
            <button type="submit" onClick={handleCreateCustomer}>Create New Customer</button></span>
        </h1>
        
        <div className="chart-container">
            <CustomerList customers={customers}/>
        </div>
   
        </>
        
    )
}