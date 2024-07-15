import { Link } from "react-router-dom"

export default function CustomerRow({customer, wsurl}) {
    return (
        <tr className="even:bg-extralightblue">
            <td className="first-column border border-x-theme  max-h-1"> <Link to={`/customers/${wsurl}/${customer._id}`}>{customer.name}</Link></td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{customer.website}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{customer.fPhone}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-32 text-nowrap">{customer.fTax}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-wrap">{customer.address}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-32 text-nowrap">{customer.fJoined}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-32 text-nowrap">{customer.renewal}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-32 text-nowrap">{customer.fCommission1}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-32 text-nowrap">{customer.fCommission2}</td>
            <td className="border border-x-theme p-2 max-h-3 min-w-48 text-nowrap">{customer.accountManager?.name}</td>
        </tr>
    )
}