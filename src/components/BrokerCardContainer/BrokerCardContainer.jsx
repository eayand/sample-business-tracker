import BrokerCard from "../BrokerCard/BrokerCard"
import BrokerSelect from "../BrokerSelect/BrokerSelect"

export default function BrokerCardContainer({ customer, customerId, setCustomer, wsurl }) {

    const brokerCards = customer.broker.map((broker) => <BrokerCard broker={broker} key={broker._id} customerId={customerId} wsurl={wsurl} setCustomer={setCustomer} />)

    return (

        <div className="flex-col">

            <BrokerSelect customer={customer} id={customerId} setCustomer={setCustomer} wsurl={wsurl} />
            
            {brokerCards}

        </div>

    )
}