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
        workspace: undefined,
        name: undefined,
    })

    useEffect(function () {
        (async () => setBrokers(await brokersAPI.listBrokers(wsurl)))()
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
        const broker = await brokersAPI.createBroker(wsurl, form)
        const brokerId = broker._id
        navigate(`/brokers/${wsurl}/${brokerId}`)
    }


    return (
        <>
            {user.workspace.length ?
                <>
                    <div className="flex flex-wrap justify-center lg:justify-between mx-20 pl-10 pr-20 pt-5">
                        <h1 className="font-bold text-3xl">Brokers </h1>
                        <form className="flex flex-wrap justify-center lg:justify-right">
                        <div>
                            <input name="name" value={form.name} onChange={handleChange} required className="mx-5 my-2 lg:my-0 w-80" data-ignore="true" data-1p-ignore="true" />
                        </div>
                        <div>
                            <button type="submit" onClick={handleCreateBroker} className="my-2 lg:my-0 bg-green text-white">Create New Broker</button>
                        </div>
                        </form>
                    </div>

                    <div className="chart-container overflow-x-scroll mx-auto mt-6 border border-lightyellow">
                        {
                            brokers.length ?
                            <BrokerTable brokers={brokers} wsurl={wsurl} />
                            :
                            <p>Create a broker to get started.</p>
                        }
                    </div>
                    <Pagination color="bg-lightyellow" />
                </>
                :
                <div className="h-96 flex flex-col justify-center text-center text-3xl">Start by creating a workspace on your homepage.</div>
            }

        </>

    )
}