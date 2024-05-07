import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function BrokerCard({customerId, broker}) {

    async function handleRemoveBroker() {
        await customersAPI.removeBroker(customerId, broker)
    }

    return (

        <div className="card-special flex-between brok-bg">
            <Link className="card-special-link" to={`/brokers/${broker._id}`}><div className="flex-col">
                <h4>{broker.name}</h4>
                <div>{broker.formatPhone}</div>
                </div></Link>
            <form>
            <button className="pre-delete raise" onClick={handleRemoveBroker}>Remove</button>
            </form>
        </div>

    )
}