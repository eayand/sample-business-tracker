import CustomerRow from "../CustomerRow/CustomerRow"

export default function CustomerList({customers}) {
    const customerList = customers.map((customer) => <CustomerRow customer={customer} key={customer._id}/>)
    return (
        <table>
            <thead>
                <tr>
                    <th className="first-column">Name</th>
                    <th>Website</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>{customerList}</tbody>
        </table>
    )
}