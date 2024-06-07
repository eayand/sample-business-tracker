import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function BrokerCard({customerId, broker, wsurl}) {

    async function handleRemoveBroker() {
        await customersAPI.removeBroker(wsurl, customerId, broker)
    }

    return (

        <div className="border border-yellowtext flex justify-between m-4 p-4">
            <Link className="card-special-link" to={`/brokers/${broker._id}`}><div className="flex-col">
                <h4 className="font-semibold" >{broker.name}</h4>
                <div>{broker.formatPhone}</div>
                </div></Link>
            <form>
            <button className="pre-delete raise" onClick={handleRemoveBroker}>Remove</button>
            </form>
        </div>

    )
}