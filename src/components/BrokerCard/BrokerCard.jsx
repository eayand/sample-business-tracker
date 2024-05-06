import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function BrokerCard({customerId, broker}) {

    async function handleRemoveBroker() {
        await customersAPI.removeBroker(customerId, broker)
    }

    return (

        <div className="card flex-between">
            <Link to={`/brokers/${broker._id}`}><p>{broker.name}</p></Link>
            <form>
            <button className="pre-delete raise" onClick={handleRemoveBroker}>Remove</button>
            </form>
        </div>

    )
}