import BrokerRow from "../BrokerRow/BrokerRow"

export default function BrokerList({brokers}) {
    const brokerList = brokers.map((broker) => <BrokerRow broker={broker} key={broker._id}/>)
    return (
        <table>
            <thead>
                <tr>
                    <th className="first-column">Name</th>
                    <th>Website</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>{brokerList}</tbody>
        </table>
    )
}