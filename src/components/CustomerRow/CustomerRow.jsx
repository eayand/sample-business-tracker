import { Link } from "react-router-dom"

export default function CustomerRow({customer}) {
    return (
        <tr>
            <td className="first-column"> <Link to={`/customers/${customer._id}`}>{customer.name}</Link></td>
            <td>{customer.website}</td>
            <td>{customer.phone}</td>
        </tr>
    )
}