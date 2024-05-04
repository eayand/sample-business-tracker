import * as customersAPI from '../../utilities/customers-api'

export default function CustomerCard({id, customer}) {

    async function handleRemoveCustomer() {
        await customersAPI.removeFromBroker(id, customer)
    }

    return (
        <div className="card">
            <p>{customer.name}</p>
            <form>
                <input type="hidden"  name="customer" value={customer._id}/>
            <button className="pre-delete" onClick={handleRemoveCustomer}>Remove</button>
            </form>
        </div>
    )
}