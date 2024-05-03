import { useState, useEffect } from "react"
import BrokerCard from "../BrokerCard/BrokerCard"
import BrokerSelect from "../BrokerSelect/BrokerSelect"
import * as brokersAPI from "../../utilities/brokers-api"

export default function BrokerCardContainer({ customer, id }) {
    const brokerCards = customer.broker.map((broker) => <BrokerCard broker={broker} key={broker._id}/> )

    return (
        <div>
             {brokerCards}

            <p>Add a Broker</p>

            <BrokerSelect customer={customer} id={id} />
            
        </div>
    )
}