import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as brokersAPI from '../../utilities/brokers-api'

export default function BrokerDetailPage() {

    const {id} = useParams()
    const [broker, setBroker] = useState({})
    const [edit, setEdit] = useState(false)

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
        (async () => setBroker(await brokersAPI.brokerDetail(id)))();
    }, [id])


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
        await brokersAPI.updateBroker(id, form)
        toggleEdit()
    }
//////////////////////////////////////////////////

    return (
        <>
        <h1>{broker.name}</h1>
        { 
        edit ? 
        <>

            <div className="flex-j-end">
                <button onClick={toggleEdit}>Cancel</button>
                <button type="submit" onClick={handleUpdateBroker}>Save</button>
            </div>

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
        </>


        : 
        <>
            <div className="flex-j-end">
                <button onClick={toggleEdit}>Edit Mode</button>
            </div>      
            <h3>Contact</h3>
            <p>{broker.website}</p>
            <p>{broker.phone}</p>
            <p>{broker.tax}</p>
            <p>{broker.address}</p>
        </>  
        }
        </>
    )
}