import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerCard({id, customer}) {

    async function handleRemoveCustomer() {
        await customersAPI.removeFromBroker(id, customer)
    }

    return (
    
        <div className="card flex-between">
            <Link to={`/customers/${customer._id}`}><div>{customer.name}</div></Link>
            <form>
                <input type="hidden"  name="customer" value={customer._id}/>
            <button className="pre-delete raise" onClick={handleRemoveCustomer}>Remove</button>
            </form>
        </div>
    
    )
}