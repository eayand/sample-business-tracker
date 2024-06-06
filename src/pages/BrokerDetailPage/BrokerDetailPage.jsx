import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as brokersAPI from '../../utilities/brokers-api'
import CustomerCardContainer from "../../components/CustomerCardContainer/CustomerCardContainer"

export default function BrokerDetailPage() {

    const navigate = useNavigate()
    const {wsurl, id} = useParams()
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
    
    
    useEffect(function() {
        (async () => setBroker(await brokersAPI.brokerDetail(wsurl, id)))();
    }, [])


    const toggleEdit = () => {
        setEdit(!edit)
    }


    /////// only used in edit mode ///////////////////
    useEffect(function() {
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
        <div className="detail-body-broker">

            <h1>{broker.name}</h1>

                
            { 
            edit ? 
            <>

                <form className="big-form">

                    <label>Name of Company</label>
                    <input name="name" value={form.name} onChange={handleChange} />
            
                    <label>Website</label>
                    <input name="website" value={form.website} onChange={handleChange} />

                    <label>Primary Phone Number</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} />

                    <label>Tax ID</label>
                    <input name="tax" value={form.tax} onChange={handleChange} />

                    <label>Address</label>
                    <textarea name="address" value={form.address} onChange={handleChange} />
        
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
                <div className="flex-j-end full-width relative">
                    <button onClick={toggleEdit} className="detail-edit-button">Edit Mode</button>
                </div>      

                <div className=" detail-section db-left">

                    <div className="title-3">
                        <h3>Basic Info</h3>
                    </div>
                    
                    <label id="test">Website</label>
                    <p>{broker.website}</p>
                    <label>Primary Phone Number</label>
                    <p>{broker.formatPhone}</p>
                    <label>Tax ID</label>
                    <p>{broker.tax}</p>
                    <label>Address</label>
                    <p>{broker.address}</p>
                </div>

            <div className="detail-section">
                
                <div className="title-3">
                    <h3>Customers:</h3>
                </div>

                    <CustomerCardContainer broker={broker} id={id} handleChange={handleChange} wsurl={wsurl} />

            </div>
            </>  
            }
        </div>
    ) : null
}