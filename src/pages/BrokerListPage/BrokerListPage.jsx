import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as brokersAPI from '../../utilities/brokers-api';
import BrokerTable from "../../components/BrokerTable/BrokerTable";
import Pagination from "../../components/Pagination/Pagination";


export default function BrokerListPage({ user }) {

    const navigate = useNavigate()
    const {wsurl} = useParams()
    const [brokers, setBrokers] = useState([])
    const [form, setForm] = useState({
        workspace: user.workspace[0],
        //come back to this and its controller and make them match customer
        name: undefined,
    })

    useEffect(function () {
        (async () => setBrokers(await brokersAPI.listBrokers()))()
    }, [])

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
            {user.workspace.length > 0 ?
                <>
                    <div className="flex-between">
                        <h1>Brokers </h1>
                        <form className="flex-ctr-ctr">
                            <input type="hidden" name="workspace" value={user.workspace[0]} required />
                            <input name="name" value={form.name} onChange={handleChange} required className="inline-input" />
                            <button type="submit" onClick={handleCreateBroker}>Create New Broker</button>
                        </form>
                    </div>

                    <div className="chart-container">
                        <BrokerTable brokers={brokers} />
                    </div>
                </>
                :
                <div className="h-96 flex flex-col justify-center text-center text-3xl">Start by creating a workspace on your homepage.</div>
            }

        </>

    )
}