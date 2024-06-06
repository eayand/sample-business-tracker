export default function CustomerInfo({customer}) {
    return (
        <>
        <label>Account Manager</label>
        <p>{customer.accountManager}</p>
        <label>Website</label>
        <p>{customer.website}</p>
        <label>Primary Phone Number</label>
        <p>{customer.formatPhone}</p>
        <label>Tax ID</label>
        <p>{customer.tax}</p>
        <label>Address</label>
        <p>{customer.address}</p>
        <label>Joined</label>
        <p>{new Date(customer.joined).toLocaleDateString()}</p>
        <label>Renewal</label>
        <p>{customer.renewal}</p>
    </>
    )

}