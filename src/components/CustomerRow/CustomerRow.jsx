import { Link } from "react-router-dom"

export default function CustomerRow({customer}) {
    return (
        <tr>
            <td className="first-column"> <Link to={`/customers/${customer._id}`}>{customer.name}</Link></td>
            <td>{customer.website}</td>
            <td>{customer.phone}</td>
            <td>{customer.tax}</td>
            <td>{customer.address}</td>
            <td>{customer.joined}</td>
            <td>{customer.renewal}</td>
            <td>{customer.commission1}</td>
            <td>{customer.commission2}</td>
            <td>{customer.accountManager}</td>
            <td>{customer.broker}</td>
        </tr>
    )
}