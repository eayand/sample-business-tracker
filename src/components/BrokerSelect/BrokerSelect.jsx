import { useState, useEffect } from "react";
import * as brokersAPI from '../../utilities/brokers-api'
import { updateCustomer } from "../../utilities/customers-api";

export default function BrokerSelect({customer, id}) {
    const [availableBrokers, setAvailableBrokers] = useState([])

    useEffect(function() {
        (async () => setAvailableBrokers(await brokersAPI.notAssocBrokers(id)))();
    }, [customer.broker])
    const test = availableBrokers.map(b => <option value={b._id}>{b.name}</option>)


    return (
        <>
        <p>{test}</p>
        <form className="margin-b">
            <select>
                {test}
            </select>
            <button onClick={updateCustomer}>Add Broker</button>
        </form>
        </>
    )
}