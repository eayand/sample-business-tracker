import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerDetailPage() {

    const {id} = useParams()
    const [customer, setCustomer] = useState({})
    const [edit, setEdit] = useState(false)

//////// only used in edit mode //////////
    const [form, setForm] = useState({
        name: undefined,
        website: undefined,
        phone: undefined,
        tax: undefined,
        address: undefined,
        joined: undefined,
        renewal: '',
        commission1: undefined,
        commission2: undefined,
        accountManager: undefined,
        broker: undefined,
    })
/////////////////////////////////


    useEffect(function() {
        (async () => setCustomer(await customersAPI.customerDetail(id)))();
    }, [])
    

    const toggleEdit = () => {
        setEdit(!edit)
    }

    
/////// only used in edit mode ///////////////////
    useEffect(function() {
        setForm(customer)
    }, [customer])


    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleUpdateCustomer(event) {
        event.preventDefault()
        await customersAPI.updateCustomer(id, form)
        toggleEdit()
    }
//////////////////////////////////////////////////


    return (
        <>
        <h1>{customer.name}</h1>
        { 
        edit ? 
        <>

            <div className="flex-j-end">
                <button onClick={toggleEdit}>Cancel</button>
                <button type="submit" onClick={handleUpdateCustomer}>Save</button>
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

                <label>Joined</label>
                <input type="date" name="joined" value={form.joined} onChange={handleChange} />

                <label>Renewal</label>
                <input name="renewal" value={form.renewal} onChange={handleChange} />

                <label>Broker Commission 1</label>
                <input type="number" name="commission1" value={form.commission1} onChange={handleChange} />

                <label>Broker Commission 2</label>
                <input type="number" name="commission2" value={form.commission2} onChange={handleChange} />

                <label>Account Manager</label>
                <input name="accountManager" value={form.accountManager} onChange={handleChange} />

                <label>Broker</label>
                <input name="broker" value={form.broker} onChange={handleChange} />
    
            </form>
        </>


        : 
        <>
            <div className="flex-j-end">
                <button onClick={toggleEdit}>Edit Mode</button>
            </div>      
            <h3>Contact</h3>
            <p>{customer.website}</p>
            <p>{customer.phone}</p>
            <p>{customer.tax}</p>
            <p>{customer.address}</p>
            <p>{customer.joined}</p>
            {/* <p>{customer.renewal}</p> */}
            <h3>Financial</h3>
            <p>{customer.commission1}</p>
            <p>{customer.commission2}</p>
            <p>{customer.accountManager}</p>
            <p>{customer.broker}</p>
            <h3>Benefit Plans</h3>
        </>  
        }
        </>
    )
}


// { 
//     edit ? 
//         <>
//             elements
//             elements
//         </>
//     : 
//         <>
//             elements
//             elements
//         </>
// }