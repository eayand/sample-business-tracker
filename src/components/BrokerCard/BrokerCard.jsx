import * as customersAPI from '../../utilities/customers-api'

export default function BrokerCard({id, broker}) {

    async function handleRemoveBroker() {
        await customersAPI.removeBroker(id, broker)
    }

    return (
        <div className="card">
            <p>{broker.name}</p>
            <form>
                <input type="hidden"  name="broker" value={broker._id}/>
            <button className="pre-delete" onClick={handleRemoveBroker}>Remove</button>
            </form>
        </div>
    )
}