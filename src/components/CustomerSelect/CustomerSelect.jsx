import { useState, useEffect } from "react";
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerSelect({wsurl, broker, id, customers, setCustomers}) {

    const [availableCustomers, setAvailableCustomers] = useState([])

    const [form, setForm] = useState({
        customer: undefined,
    })

    useEffect(function() {
        (async () => setAvailableCustomers(await customersAPI.notAssocCustomers(wsurl, id)))();
    }, [customers])

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleAssociateCustomer(event) {
        event.preventDefault()
        const newCustomer = await customersAPI.associateWithBroker(wsurl, id, form)
        const customerId = newCustomer._id
        setCustomers([...customers, newCustomer])
        setForm({customer: ""})
    }

    const dropdown = availableCustomers.map(c => <option value={c._id} key={c._id}>{c.name}</option>)

    return (
        <>
        <form className="flex justify-end mx-4">
            <select name="customer" value={form.customer} onChange={handleChange} required className="border border-2 border-bluetext min-w-60 focus:bg-extralightblue">
                <option value=""></option>
                {dropdown}
            </select>
            <button type="submit" onClick={handleAssociateCustomer} className="ml-4 text-nowrap">Add Customer</button>
        </form>
        </>
    )




}