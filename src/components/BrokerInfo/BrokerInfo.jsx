export default function BrokerInfo({ broker }) {
    return (
        <>
            <label className="text-yellowtext">Website</label>
            <p className="mb-3 h-8">{broker.website}</p>
            <label className="text-yellowtext">Primary Phone Number</label>
            <p className="mb-3 h-8">{broker.formatPhone}</p>
            <label className="text-yellowtext">Tax ID</label>
            <p className="mb-3 h-8">{broker.tax}</p>
            <label className="text-yellowtext">Address</label>
            <p className="mb-3 h-8">{broker.address}</p>
        </>
    )
}