import { useState, useEffect } from "react"
import CustomerCard from "../CustomerCard/CustomerCard"
import CustomerSelect from "../CustomerSelect/CustomerSelect"
import * as brokersAPI from '../../utilities/brokers-api'

export default function CustomerCardContainer({ broker, id }) {

    const [customers, setCustomers] = useState([])

    useEffect(function() {
        (async () => setCustomers(await brokersAPI.getAssocCustomers(id)))();
    }, [])
    
    const customerCards = customers.map((customer) => <CustomerCard customer={customer} key={customer._id} id={id} /> )

    return (

        <div className="flex-col">

            {customerCards}

            <p>Add a Customer</p>

            <CustomerSelect broker={broker} id={id} customers={customers} />
            
        </div>
        
    )
}