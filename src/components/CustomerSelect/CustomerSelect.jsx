import { useState, useEffect } from "react";
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerSelect({broker, id, customers}) {
    const [availableCustomers, setAvailableCustomers] = useState([])
    const [form, setForm] = useState({
        customer: undefined,
    })


    useEffect(function() {
        (async () => setAvailableCustomers(await customersAPI.notAssocCustomers(id)))();
    }, [])

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleAssociateCustomer(event) {
        event.preventDefault()
        await customersAPI.associateWithBroker(id, form)
    }

    const dropdown = availableCustomers.map(c => <option value={c._id} key={c._id}>{c.name}</option>)

    return (
        <>
        <form className="margin-b">
            <select name={"customer"} value={form.customer} onChange={handleChange}>
                <option value=""></option>
                {dropdown}
            </select>
            <button onClick={handleAssociateCustomer}>Add Customer</button>
        </form>
        </>
    )




}