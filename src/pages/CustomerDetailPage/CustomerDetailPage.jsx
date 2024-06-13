import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import * as customersAPI from '../../utilities/customers-api'
import BrokerCardContainer from "../../components/BrokerCardContainer/BrokerCardContainer"
import CustomerInfo from "../../components/CustomerInfo/CustomerInfo"
import PlanContainer from "../../components/PlanContainer/PlanContainer"
import Box from "../../components/Box/Box"
import CustomerFinancial from "../../components/CustomerFinancial/CustomerFinancial"

export default function CustomerDetailPage() {

    const navigate = useNavigate()
    const { wsurl, id } = useParams()
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


    useEffect(function () {
        (async () => setCustomer(await customersAPI.customerDetail(wsurl, id)))();
    }, [])


    const toggleEdit = () => {
        setEdit(!edit)
    }


    //vvvvvvvvvvv only used in edit mode vvvvvvvvvv
    useEffect(function () {
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
        const customer = await customersAPI.updateCustomer(wsurl, id, form)
        setCustomer(customer)
        toggleEdit()
    }

    const togglePreDelete = () => {
        setPreDelete(!preDelete)
    }

    async function handleDeleteCustomer() {
        await customersAPI.deleteCustomer(wsurl, id)
        navigate(`/customers/${wsurl}`)
    }
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


    return customer ? (
        <div className="detail-body">

            <h1 className="font-bold text-3xl text-center">{customer.name}</h1>

            {
                edit ?
                    <>
                        <form className="big-form">

                            <label>Name of Company</label>
                            <input name="name" value={form.name} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Website</label>
                            <input name="website" value={form.website} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Primary Phone Number</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Tax ID</label>
                            <input name="tax" value={form.tax} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Joined</label>
                            <input type="date" name="joined" value={form.joined} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Renewal</label>
                            <select name="renewal" value={form.renewal} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1">
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
                            <input type="number" name="commission1" value={form.commission1} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Broker Commission 2</label>
                            <input type="number" name="commission2" value={form.commission2} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

                            <label>Account Manager</label>
                            <input name="accountManager" value={form.accountManager} onChange={handleChange} className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1"/>

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


                        <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-12">

                            <div className="mx-auto sm:mx-6 my-4 sm:col-start-10 sm:col-span-2 sm:flex sm:justify-end">
                                <button onClick={toggleEdit} className="">Edit Mode</button>
                            </div>

                            <div className="sm:row-span-2 sm:col-span-5 sm:col-start-2" >
                                <Box title="Basic Info"
                                    contents={<CustomerInfo customer={customer} />}
                                />
                            </div>

                            <div className="sm:col-span-5 sm:col-start-7">
                                <Box title="Financial"
                                    contents={<CustomerFinancial customer={customer} />}
                                />
                            </div>

                            <div className="sm:col-span-5 sm:col-start-7">
                                <Box title="Brokers"
                                    contents={<BrokerCardContainer customer={customer} customerId={id} setCustomer={setCustomer} wsurl={wsurl} />}
                                />
                            </div>

                            <div className="sm:col-span-10 sm:col-start-2">
                                <Box title="Benefit Plans"
                                    contents={<PlanContainer customer={customer} customerId={id} wsurl={wsurl} />}
                                />
                            </div>
                        </div>

                    </>
            }
        </div>
    ) : null
}  