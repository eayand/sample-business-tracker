import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as customersAPI from '../../utilities/customers-api'
import BrokerCardContainer from "../../components/BrokerCardContainer/BrokerCardContainer"

export default function CustomerDetailPage() {

    const navigate = useNavigate()
    const {id} = useParams()
    const [customer, setCustomer] = useState(null)
    const [edit, setEdit] = useState(false)
    const [preDelete, setPreDelete] = useState(false)

//vvvvvvvvvvv only used in edit mode vvvvvvvvvv
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
    })
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    useEffect(function() {
        (async () => setCustomer(await customersAPI.customerDetail(id)))();
    }, [])
    

    const toggleEdit = () => {
        setEdit(!edit)
    }


//vvvvvvvvvvv only used in edit mode vvvvvvvvvv
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

    const togglePreDelete = () => {
        setPreDelete(!preDelete)
    }

    async function handleDeleteCustomer() {
        await customersAPI.deleteCustomer(id)
        navigate('/customers')
    }
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//question mark after customer means only load if it's truthy; this is why customer's initial state needs to be null and not an empty object; it will wait to load this page until customer is available, which allows all the child components to work
    return customer ? (
        <>
            <div className="margin-b">
                <h2>Brokers:</h2>
                <BrokerCardContainer customer={customer} id={id} handleChange={handleChange} />
            </div>
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
    
            </form>

             { 
                preDelete ? 
                    <>
                        <div>
                            <p>Are you sure you want to delete {customer.name}?</p>
                            <button onClick={togglePreDelete}>Cancel</button>
                            <button onClick={handleDeleteCustomer}>Delete</button>
                        </div>
                    </>
                : 
                    <>
                        <div>
                            <button className="pre-delete" onClick={togglePreDelete}>DELETE THIS CUSTOMER</button>
                        </div>
                    </>
                }

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
            <p>{customer.renewal}</p>
            <h3>Financial</h3>
            <p>{customer.commission1}</p>
            <p>{customer.commission2}</p>
            <p>{customer.accountManager}</p>
            <h3>Benefit Plans</h3>
        </>  
        }
        </>
    ) : null
    // : null is the option if the customer isn't available yet. It makes the page stay blank until then. You could have a loading screen here instead.
}  