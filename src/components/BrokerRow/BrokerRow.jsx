import { Link } from "react-router-dom"

export default function BrokerRow({broker, wsurl}) {
    return (
        <tr className="even:bg-extralightyellow">
            <td className="first-column border border-x-theme  max-h-1"> <Link to={`/brokers/${wsurl}/${broker._id}`}>{broker.name}</Link></td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{broker.website}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{broker.fPhone}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{broker.tax}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{broker.address}</td>
        </tr>
    )
}