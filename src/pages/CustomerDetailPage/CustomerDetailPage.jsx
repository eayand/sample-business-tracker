import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as customersAPI from '../../utilities/customers-api'
import BrokerCardContainer from "../../components/BrokerCardContainer/BrokerCardContainer"
import PlanCardContainer from "../../components/PlanCardContainer/PlanCardContainer"

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
        <div className="detail-body">

            <h1>{customer.name}</h1>

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

                    <label>Joined</label>
                    <input type="date" name="joined" value={form.joined} onChange={handleChange} />

                    <label>Renewal</label>
                    <select name="renewal" value={form.renewal} onChange={handleChange}>
                        <option value="" selected></option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>                
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select><br />

                    <label>Broker Commission 1</label>
                    <input type="number" name="commission1" value={form.commission1} onChange={handleChange} />

                    <label>Broker Commission 2</label>
                    <input type="number" name="commission2" value={form.commission2} onChange={handleChange} />

                    <label>Account Manager</label>
                    <input name="accountManager" value={form.accountManager} onChange={handleChange} />
        
                </form>

                <div className="edit-controls">
                    <button type="submit" onClick={handleUpdateCustomer}>SAVE</button>
                    <button onClick={toggleEdit}>CANCEL</button>
                    { 
                        preDelete ? 
                        <>
                            <div className="large-alert">
                                <p>Are you sure you want to delete {customer.name}?</p>
                                <button onClick={togglePreDelete}>Cancel</button>
                                <button onClick={handleDeleteCustomer}>Delete</button>
                            </div>
                        </>
                    : 
                        <>
                                
                                <button className="pre-delete" onClick={togglePreDelete}>DELETE THIS CUSTOMER</button>
                        </>
                    }
                </div>

            </>


            : 
            <>
                <div className="flex-j-end full-width relative">
                    <button onClick={toggleEdit} className="detail-edit-button">Edit Mode</button>
                </div>      


                <div className="detail-section db-left">

                    <div className="title-3">
                        <h3>Basic Info</h3>
                    </div>

                    <label>Account Manager</label>
                    <p>{customer.accountManager}</p>
                    <label>Website</label>
                    <p>{customer.website}</p>
                    <label>Primary Phone Number</label>
                    <p>{customer.formatPhone}</p>
                    <label>Tax ID</label>
                    <p>{customer.tax}</p>
                    <label>Address</label>
                    <p>{customer.address}</p>
                    <label>Joined</label>
                    <p>{customer.joined}</p>
                    <label>Renewal</label>
                    <p>{customer.renewal}</p>

                </div>


                <div className="db-right">
                    <div className="detail-section full-width">
                        <div className="title-3">
                            <h3>Financial</h3>
                        </div>
                        <label>Commission 1</label>
                        <p>{customer.fCommission1}</p>
                        <label>Commission 2</label>
                        <p>{customer.fCommission2}</p>
                    </div>

                    <div className="detail-section">
                        <div className="title-3">
                            <h3>Brokers</h3>
                        </div>
                            <BrokerCardContainer customer={customer} customerId={id} />
                        </div>
                    </div>

                <div className="detail-section db-bottom">

                    <div className="title-3">
                        <h3>Benefit Plans</h3>
                    </div>

                    <PlanCardContainer customer={customer} id={id} handleChange={handleChange} />

                </div>

            </>  
            }
        </div>
    ) : null
    // : null is the option if the customer isn't available yet. It makes the page stay blank until then. You could have a loading screen here instead.
}  