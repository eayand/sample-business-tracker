import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function BrokerCard({ customerId, broker, wsurl, setCustomer }) {

    async function handleRemoveBroker() {
        const updatedCustomer = await customersAPI.removeBroker(wsurl, customerId, broker)
        setCustomer(updatedCustomer)
    }

    return (

        <div className="border border-yellowtext flex justify-between m-4 p-4">
            <Link className="card-special-link" to={`/brokers/${broker._id}`}><div className="flex-col">
                <h4 className="font-semibold" >{broker.name}</h4>
                <div>{broker.formatPhone}</div>
            </div></Link>
            <button className="h-6 w-6 p-0" type="button" onClick={handleRemoveBroker}>
                <span className="material-symbols-outlined text-2xl leading-6">close</span>
            </button>
        </div>

    )
}