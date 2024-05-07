import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as brokersAPI from '../../utilities/brokers-api';
import BrokerTable from "../../components/BrokerTable/BrokerTable";


export default function BrokerListPage({user}) {
    
    const navigate = useNavigate()
    const [brokers, setBrokers] = useState([])
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
    })

    useEffect(function() {
        (async () => setBrokers(await brokersAPI.listBrokers()))()
    }, [] )

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleCreateBroker(event) {
        event.preventDefault()
        const broker = await brokersAPI.createBroker(form)
        const brokerId = broker._id
        navigate(`/brokers/${brokerId}`)
    }


    return (
        <>
        <div className="flex-between">
            <h1>Brokers </h1>
            <form className="flex-ctr-ctr">
                <input type="hidden" name="workspace" value={user.workspace[0]} required />
                <input name="name" value={form.name} onChange={handleChange} required className="inline-input"/>
                <button type="submit" onClick={handleCreateBroker}>Create New Broker</button>
            </form>
        </div>

        <div className="chart-container">
            <BrokerTable brokers={brokers}/>
        </div>

        </>
        
    )
}