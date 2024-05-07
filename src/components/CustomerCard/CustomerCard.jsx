import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerCard({id, customer}) {

    async function handleRemoveCustomer() {
        await customersAPI.removeFromBroker(id, customer)
    }

    return (
    
        <div className="card-special flex-between cu-bg">
            <Link className="card-special-link" to={`/customers/${customer._id}`}><div className="flex-col">
                <h4>{customer.name}</h4>
                <div>{customer.phone}</div>
            </div></Link>
            <form>
            <button className="pre-delete raise" onClick={handleRemoveCustomer}>Remove</button>
            </form>
        </div>
    
    )
}