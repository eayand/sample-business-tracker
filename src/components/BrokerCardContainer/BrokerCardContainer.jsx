import BrokerCard from "../BrokerCard/BrokerCard"
import BrokerSelect from "../BrokerSelect/BrokerSelect"

export default function BrokerCardContainer({ customer, id }) {
    const brokerCards = customer.broker.map((broker) => <BrokerCard broker={broker} key={broker._id} id={id} /> )

    return (
        <div>
             {brokerCards}

            <p>Add a Broker</p>

            <BrokerSelect customer={customer} id={id} />
            
        </div>
    )
}