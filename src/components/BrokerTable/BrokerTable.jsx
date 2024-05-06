import BrokerRow from "../BrokerRow/BrokerRow"

export default function BrokerTable({brokers}) {
    const brokerTable = brokers.map((broker) => <BrokerRow broker={broker} key={broker._id}/>)
    return (
        <table className="theme-broker">
            <thead>
                <tr>
                    <th className="first-column">Name</th>
                    <th>Website</th>
                    <th>Phone</th>
                    <th>Tax ID</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>{brokerTable}</tbody>
        </table>
    )
}