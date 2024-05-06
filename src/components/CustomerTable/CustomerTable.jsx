import CustomerRow from "../CustomerRow/CustomerRow"

export default function CustomerTable({customers}) {
    const customerTable = customers.map((customer) => <CustomerRow customer={customer} key={customer._id}/>)
    return (
        <table>
            <thead>
                <tr>
                    <th className="first-column">Name</th>
                    <th>Website</th>
                    <th>Phone</th>
                    <th>Tax ID</th>
                    <th>Address</th>
                    <th>Joined</th>
                    <th>Renewal</th>
                    <th>Commission 1</th>
                    <th>Commission 2</th>
                    <th>Account Manager</th>
                    <th>Broker</th>
                </tr>
            </thead>
            <tbody>{customerTable}</tbody>
        </table>
    )
}