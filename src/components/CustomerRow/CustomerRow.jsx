import { Link } from "react-router-dom"

export default function CustomerRow({customer}) {
    return (
        <tr>
            <td className="first-column"> <Link to={`/customers/${customer._id}`}>{customer.name}</Link></td>
            <td>{customer.website}</td>
            <td>{customer.formatPhone}</td>
            <td>{customer.tax}</td>
            <td>{customer.address}</td>
            <td>{new Date(customer.fJoined).toLocaleDateString()}</td>
            <td>{customer.renewal}</td>
            <td>{customer.fCommission1}</td>
            <td>{customer.fCommission2}</td>
            <td>{customer.accountManager}</td>
        </tr>
    )
}