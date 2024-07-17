import { useState, useEffect } from "react"
import CustomerCard from "../CustomerCard/CustomerCard"
import CustomerSelect from "../CustomerSelect/CustomerSelect"
import * as brokersAPI from '../../utilities/brokers-api'

export default function CustomerCardContainer({ broker, id, wsurl }) {

    const [customers, setCustomers] = useState([])

    useEffect(getCustomers, [])

    function getCustomers() {
        (async () => setCustomers(await brokersAPI.getAssocCustomers(wsurl, id)))()
    }
    
    const customerCards = customers.map((customer) => <CustomerCard customer={customer} key={customer._id} id={id} wsurl={wsurl} getCustomers={getCustomers}/> )

    return (

        <div className="flex-col">
            
        <CustomerSelect broker={broker} id={id} customers={customers} setCustomers={setCustomers} wsurl={wsurl} />

        <div className="flex justify-center sm:justify-start" >
        {customerCards}
        </div>
            
        </div>
        
    )
}