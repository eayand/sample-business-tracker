import { Link } from "react-router-dom"

export default function BrokerRow({broker}) {
    return (
        <tr>
            <td className="first-column"> <Link to={`/brokers/${broker._id}`}>{broker.name}</Link></td>
            <td>{broker.website}</td>
            <td>{broker.phone}</td>
        </tr>
    )
}