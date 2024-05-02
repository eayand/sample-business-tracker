import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as brokersAPI from '../../utilities/brokers-api'

export default function BrokerDetailPage() {

    const {id} = useParams()

    const [broker, setBroker] = useState({})

    useEffect(function() {
        (async () => setBroker(await brokersAPI.brokerDetail(id)))();
    }, [id])

    return (
        <>
        <h1>{broker.name}</h1>
        <h3>Contact</h3>
        <p>{broker.website}</p>
        <p>{broker.phone}</p>
        </>
    )
}