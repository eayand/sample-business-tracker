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
    const [edit, setEdit] = useState(false)
    const [preDelete, setPreDelete] = useState(false)

    //////// only used in edit mode //////////
    const [form, setForm] = useState({
        name: undefined,
        website: undefined,
        phone: undefined,
        tax: undefined,
        address: undefined,
    })
    /////////////////////////////////


    useEffect(function () {
        (async () => setBroker(await brokersAPI.brokerDetail(wsurl, id)))();
    }, [])


    const toggleEdit = () => {
        setEdit(!edit)
    }


    /////// only used in edit mode ///////////////////
    useEffect(function () {
        setForm(broker)
    }, [broker])


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

    async function handleDeleteBroker() {
        await brokersAPI.deleteBroker(wsurl, id)
        navigate(`/brokers/${wsurl}`)
    }

    //////////////////////////////////////////////////

    return broker ? (
        <div>

            <h1 className="font-bold text-3xl text-center">{broker.name}</h1>


            {
                edit ?
                    <>

                        <form className="big-form">

                            <label>Name of Company</label>
                            <input name="name" value={form.name} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />

                            <label>Website</label>
                            <input name="website" value={form.website} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />

                            <label>Primary Phone Number</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />

                            <label>Tax ID</label>
                            <input name="tax" value={form.tax} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />

                            <label>Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" />

                        </form>

                        <div className="edit-controls">
                            <button type="submit" onClick={handleUpdateBroker}>SAVE</button>
                            <button onClick={toggleEdit}>CANCEL</button>

                            {
                                preDelete ?
                                    <>
                                        <div className="large-alert">
                                            <p>Are you sure you want to delete {broker.name}?</p>
                                            <button onClick={togglePreDelete}>Cancel</button>
                                            <button onClick={handleDeleteBroker}>Delete</button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <button className="pre-delete" onClick={togglePreDelete}>DELETE THIS BROKER</button>
                                    </>
                            }
                        </div>

                    </>


                    :
                    <>
                        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-12">

                            <div className="mx-auto sm:mx-6 my-4 sm:col-start-10 sm:col-span-2 sm:flex sm:justify-end">
                                <button onClick={toggleEdit} className="detail-edit-button">Edit Mode</button>
                            </div>

                            <div className=" sm:row-span-2 sm:col-span-5 sm:col-start-2">
                                <Box title="Basic Info"
                                    contents={<BrokerInfo broker={broker} />} />
                            </div>

                            <div className="sm:col-span-5 sm:col-start-7">
                                <Box title="Financial"
                                    contents="add typical commissions here"
                                />
                            </div>

                            <div className="sm:col-span-10 sm:col-start-2">
                                <Box title="Customers"
                                    contents={<CustomerCardContainer broker={broker} id={id} handleChange={handleChange} wsurl={wsurl} />}
                                />
                                
                            </div>

                        </div>
                    </>
            }
        </div>
    ) : null
}