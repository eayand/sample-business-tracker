import BrokerRow from "../BrokerRow/BrokerRow"

export default function BrokerTable({brokers}) {
    const brokerTable = brokers.map((broker) => <BrokerRow broker={broker} key={broker._id}/>)
    return (
        <table>
            <thead>
                <tr>
                    <th className="first-column">Name</th>
                    <th>Website</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>{brokerTable}</tbody>
        </table>
    )
}