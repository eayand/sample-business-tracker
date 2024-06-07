export default function CustomerInfo({customer}) {
    return (
        <>
        <label className="text-bluetext">Account Manager</label>
        <p className="mb-3 h-8">{customer.accountManager}</p>

        <label className="text-bluetext">Website</label>
        <p className="mb-3 h-8">{customer.website}</p>

        <label className="text-bluetext">Primary Phone Number</label>
        <p className="mb-3 h-8">{customer.formatPhone}</p>

        <label className="text-bluetext">Tax ID</label>
        <p className="mb-3 h-8">{customer.tax}</p>

        <label className="text-bluetext">Address</label>
        <p className="mb-3 h-8">{customer.address}</p>

        <label className="text-bluetext">Joined</label>
        <p className="mb-3 h-8">{new Date(customer.joined).toLocaleDateString()}</p>

        <label className="text-bluetext">Renewal</label>
        <p className="mb-3 h-8">{customer.renewal}</p>
    </>
    )

}