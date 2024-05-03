import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as brokersAPI from '../../utilities/brokers-api';
import BrokerTable from "../../components/BrokerTable/BrokerTable";


export default function BrokerListPage({user}) {
    const [brokers, setBrokers] = useState([])
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        name: undefined,
    })
    // const [goTo, setGoTo] = useState('')

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
        await brokersAPI.createBroker(form)
        //add redirect to newly created customer's detail page
    }


    return (
        <>
        <h1 className="align-left">Brokers <span>
            <input type="hidden" name="workspace" value={user.workspace[0]} />
            <input name="name" value={form.name} onChange={handleChange} />
            <button type="submit" onClick={handleCreateBroker}>Create New Broker</button></span>
        </h1>
        
        <div className="chart-container">
            <BrokerTable brokers={brokers}/>
        </div>
   
        </>
        
    )
}