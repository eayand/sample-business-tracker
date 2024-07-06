import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as brokersAPI from '../../utilities/brokers-api'
import Box from "../../components/Box/Box"
import BrokerInfo from "../../components/BrokerInfo/BrokerInfo"
import CustomerCardContainer from "../../components/CustomerCardContainer/CustomerCardContainer"

export default function BrokerDetailPage() {

    const navigate = useNavigate()
    const { wsurl, id } = useParams()
    const [broker, setBroker] = useState(null)
    const [actions, setActions] = useState(false)
    const [edit, setEdit] = useState(false)
    const [preDelete, setPreDelete] = useState(false)
    const [form, setForm] = useState({
        name: null,
    })

    useEffect(function () {
        (async () => {
            const brokerResult = await brokersAPI.brokerDetail(wsurl, id)
            setBroker(brokerResult)
            setForm({
                name: brokerResult.name
            })
        })();
    }, [])
    // confirm if there's any reason not to use             setBroker(await brokersAPI.brokerDetail(wsurl, id))

    const toggleActions = () => {
        setActions(!actions)
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const editAndActions = () => {
        toggleActions()
        toggleEdit()
    }

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleUpdateBroker(event) {
        event.preventDefault()
        const broker = await brokersAPI.updateBroker(wsurl, id, form)
        setBroker(broker)
        toggleEdit()
    }

    const togglePreDelete = () => {
        setPreDelete(!preDelete)
    }

    const preDeleteAndActions = () => {
        toggleActions()
        togglePreDelete()
    }

    async function handleDeleteBroker() {
        await brokersAPI.deleteBroker(wsurl, id)
        navigate(`/brokers/${wsurl}`)
    }


    return broker ? (
        <>

            <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-12">

                <div className="sm:flex sm:justify-between sm:col-span-10 sm:col-start-2 mx-auto sm:mx-6 my-4">
                    {
                        edit ?
                            <form>
                                <input name="name" value={form.name} onChange={handleChange} className="font-bold text-3xl sm:w-full text-left mt-14 sm:mt-0 border border-theme" />
                                <button type="submit" onClick={handleUpdateBroker}>SAVE</button>
                                <button onClick={toggleEdit}>CANCEL</button>
                            </form>
                            :
                            <h1 className="font-bold text-3xl sm:w-full text-left mt-14 sm:mt-0">{broker.name}</h1>
                    }
                    <div>
                        <button className="flex pt-2 pb-1 pl-2 mt-2 mx-auto relative z-[9]" onClick={toggleActions}>
                            <div className="-mt-1">Actions</div> <span className="material-symbols-outlined -mb-6 pl-1 -mr-1">
                                arrow_drop_down
                            </span></button>
                        <div className={`py-2 border border-r-2 border-gray-300 z-[8] bg-white ${actions ? "absolute" : "hidden"}`}>
                            <p onClick={editAndActions} className="pl-3 pr-5 py-1 hover:bg-lightyellow">Rename</p>
                            <p onClick={preDeleteAndActions} className="pl-3 pr-5 py-1 hover:bg-lightyellow">Delete</p>
                        </div>
                    </div>
                </div>

                <div className=" sm:row-span-2 sm:col-span-5 sm:col-start-2">
                    <Box title="Basic Info"
                        contents={<BrokerInfo wsurl={wsurl} broker={broker} id={id} setBroker={setBroker} />} />
                </div>

                <div className="sm:col-span-5 sm:col-start-7">
                    <Box title="Financial"
                        contents="* Feature Coming Soon * This area will display any default commissions rates for the broker."
                    />
                </div>

                <div className="sm:col-span-10 sm:col-start-2">
                    <Box title="Customers"
                        contents={<CustomerCardContainer broker={broker} id={id} handleChange={handleChange} wsurl={wsurl} />}
                    />

                </div>

            </div>
            <div className={`${preDelete ? "fixed top-0" : "hidden"} flex w-full h-full bg-gray-400 bg-opacity-75 z-20`}>
                <div className="m-auto w-[40rem] bg-white flex flex-col justify-between rounded-3xl">
                    <p className="text-2xl font-semibold m-10">Delete Broker?</p>
                    <p className="mx-10">Are you sure you want to delete <span className="font-semibold">{broker.name}</span>?</p>
                    <div className="flex justify-end m-10">
                        <button onClick={togglePreDelete}>Cancel</button>
                        <button onClick={handleDeleteBroker} className="ml-10 text-white bg-red">Delete</button>
                    </div>
                </div>
            </div>
        </>
    ) : null
}