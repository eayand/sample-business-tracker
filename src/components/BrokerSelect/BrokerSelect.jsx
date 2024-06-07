import { useState, useEffect } from "react";
import * as brokersAPI from '../../utilities/brokers-api'
import { associateBroker } from "../../utilities/customers-api";

export default function BrokerSelect({customer, id, setCustomer, wsurl}) {
    const [availableBrokers, setAvailableBrokers] = useState([])
    const [form, setForm] = useState({
        broker: undefined,
    })

    useEffect(function() {
        (async () => setAvailableBrokers(await brokersAPI.notAssocBrokers(wsurl, id)))();
    }, [customer.broker])

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleAssociateBroker(event) {
        event.preventDefault()
        const updatedCustomer = await associateBroker(wsurl, id, form)
        setCustomer(updatedCustomer)
        setForm({broker: undefined})
    }

    const dropdown = availableBrokers.map(b => <option value={b._id} key={b._id} className="w-full">{b.name}</option>)


    return (
        <>
        <form className="flex justify-end m-4">
            <select name="broker" value={form.broker} onChange={handleChange} required 
            className="w-full border border-yellowtext border-2 px-2 focus:bg-extralightyellow focus:border-yellowtext ">
                <option value=""></option>
                {dropdown}
            </select>
            <button type="submit" onClick={handleAssociateBroker} className="ml-4 text-nowrap">Add Broker</button>
        </form>
        </>
    )
}