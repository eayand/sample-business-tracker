import BrokerRow from "../BrokerRow/BrokerRow"

export default function BrokerTable({brokers, wsurl}) {
    const brokerTable = brokers.map((broker) => <BrokerRow broker={broker} key={broker._id} wsurl={wsurl}/>)
    return (
        <table className="table-fixed">
            <thead>
                <tr>
                    <th className="bg-lightyellow border border-theme max-h-3 w-64 first-column">Name</th>
                    <th className="bg-lightyellow border border-theme max-h-3 w-64">Website</th>
                    <th className="bg-lightyellow border border-theme max-h-3 w-64">Phone</th>
                    <th className="bg-lightyellow border border-theme max-h-3 w-64">Tax ID</th>
                    <th className="bg-lightyellow border border-theme max-h-3 w-64">Address</th>
                </tr>
            </thead>
            <tbody>{brokerTable}</tbody>
        </table>
    )
}