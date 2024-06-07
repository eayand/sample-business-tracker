export default function CustomerFinancial({ customer }) {
    return (
        <>
            <label className="text-bluetext">Commission 1</label>
            <p className="mb-3 h-8">{customer.fCommission1}</p>
            <label className="text-bluetext">Commission 2</label>
            <p className="mb-3 h-8">{customer.fCommission2}</p>
        </>
    )
}