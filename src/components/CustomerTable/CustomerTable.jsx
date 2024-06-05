import CustomerRow from "../CustomerRow/CustomerRow"

export default function CustomerTable({customers, wsurl}) {
    const customerTable = customers.map((customer) => <CustomerRow customer={customer} key={customer._id} wsurl={wsurl} />)
    return (
        <table className="table-fixed">
            <thead>
                <tr>
                    <th className="bg-lightblue border border-theme max-h-3 w-64 first-column">Name</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Website</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Phone</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Tax ID</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Address</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Joined</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Renewal</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Comm 1</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Comm 2</th>
                    <th className="bg-lightblue border border-theme max-h-3 w-64">Account Manager</th>
                </tr>
            </thead>
            <tbody>{customerTable}</tbody>
        </table>
    )
}