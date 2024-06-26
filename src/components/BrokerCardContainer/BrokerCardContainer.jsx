import BrokerCard from "../BrokerCard/BrokerCard"
import BrokerSelect from "../BrokerSelect/BrokerSelect"

export default function BrokerCardContainer({ customer, customerId, setCustomer }) {

    const brokerCards = customer.broker.map((broker) => <BrokerCard broker={broker} key={broker._id} customerId={customerId} /> )

    return (

        <div className="flex-col">


            <BrokerSelect customer={customer} id={customerId} setCustomer={setCustomer} />
            
            {brokerCards}
        </div>

    )
}