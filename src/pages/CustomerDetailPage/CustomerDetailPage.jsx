import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerDetailPage() {

    const {id} = useParams()

    const [customer, setCustomer] = useState({})

    useEffect(function() {
        (async () => setCustomer(await customersAPI.customerDetail(id)))();
    }, [])

    return (
        <>
        <h1>{customer.name}</h1>
        <p>customer detail</p>
        </>
    )
}