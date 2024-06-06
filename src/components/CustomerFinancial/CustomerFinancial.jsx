export default function CustomerFinancial({ customer }) {
    return (
        <>
            <label>Commission 1</label>
            <p>{customer.fCommission1}</p>
            <label>Commission 2</label>
            <p>{customer.fCommission2}</p>
        </>
    )
}