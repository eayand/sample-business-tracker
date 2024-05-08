import { useState, useEffect } from "react";
import * as brokersAPI from '../../utilities/brokers-api'
import { associateBroker } from "../../utilities/customers-api";

export default function BrokerSelect({customer, id, setCustomer}) {
    const [availableBrokers, setAvailableBrokers] = useState([])
    const [form, setForm] = useState({
        broker: undefined,
    })

    useEffect(function() {
        (async () => setAvailableBrokers(await brokersAPI.notAssocBrokers(id)))();
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
        const updatedCustomer = await associateBroker(id, form)
        setCustomer(updatedCustomer)

    }

    const dropdown = availableBrokers.map(b => <option value={b._id} key={b._id}>{b.name}</option>)


    return (
        <>
        <form className="flex-ctr-ctr">
            <select name="broker" value={form.broker} onChange={handleChange} required className="inline-input ii-small">
                <option value=""></option>
                {dropdown}
            </select>
            <button type="submit" onClick={handleAssociateBroker}>Add Broker</button>
        </form>
        </>
    )
}