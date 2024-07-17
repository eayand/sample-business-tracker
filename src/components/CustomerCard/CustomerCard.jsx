import { Link } from 'react-router-dom'
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerCard({wsurl, id, customer, getCustomers}) {

    async function handleRemoveCustomer() {
        await customersAPI.removeFromBroker(wsurl, id, customer)
        getCustomers()
    }

    return (
    
        <div className="border border-bluetext flex justify-between m-4 p-4 sm:w-96">
            <Link to={`/customers/${wsurl}/${customer._id}`}><div className="flex-col">
                <h4 className="font-semibold">{customer.name}</h4>
                <div>{customer.fPhone}</div>
            </div></Link>
            <button className="h-6 w-6 p-0" type="button" onClick={handleRemoveCustomer}>
                <span className="material-symbols-outlined text-2xl leading-6">close</span>
            </button>
        </div>
    
    )
}