import BrokerCard from "../BrokerCard/BrokerCard"
import BrokerSelect from "../BrokerSelect/BrokerSelect"

export default function BrokerCardContainer({ customer, customerId }) {

    const brokerCards = customer.broker.map((broker) => <BrokerCard broker={broker} key={broker._id} customerId={customerId} /> )

    return (

        <div className="flex-col">

            {brokerCards}

            <p>Add a Broker</p>

            <BrokerSelect customer={customer} id={customerId} />
            
        </div>

    )
}