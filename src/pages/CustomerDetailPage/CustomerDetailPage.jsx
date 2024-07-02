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
    const [actions, setActions] = useState(false)
    const [edit, setEdit] = useState(false)
    const [preDelete, setPreDelete] = useState(false)
    const [form, setForm] = useState({
        name: null,
    })

    useEffect(function () {
        (async () => {
            const customerResult = await customersAPI.customerDetail(wsurl, id)
            setCustomer(customerResult)
            setForm({
                name: customerResult.name
            })
        })();
    }, [])

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

    async function handleUpdateCustomer(event) {
        event.preventDefault()
        const customer = await customersAPI.updateCustomer(wsurl, id, form)
        setCustomer(customer)
        toggleEdit()
    }

    const togglePreDelete = () => {
        setPreDelete(!preDelete)
    }

    const preDeleteAndActions = () => {
        toggleActions()
        togglePreDelete()
    }

    async function handleDeleteCustomer() {
        await customersAPI.deleteCustomer(wsurl, id)
        navigate(`/customers/${wsurl}`)
    }

    return customer ? (
        <>

            <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-12">

                <div className="sm:flex sm:justify-between sm:col-span-10 sm:col-start-2 mx-auto sm:mx-6 my-4">
                    {
                        edit ?
                            <form>
                                <input name="name" value={form.name} onChange={handleChange} className="font-bold text-3xl sm:w-full text-left mt-14 sm:mt-0 border border-theme" data-ignore="true" data-1p-ignore="true" />
                                <button type="submit" onClick={handleUpdateCustomer}>SAVE</button>
                                <button onClick={toggleEdit}>CANCEL</button>
                            </form>
                            :
                            <h1 className="font-bold text-3xl sm:w-full text-left mt-14 sm:mt-0">{customer.name}</h1>
                    }
                    <div>
                        <button className="flex pt-2 pb-1 pl-2 mt-2 mx-auto relative z-[9]" onClick={toggleActions}>
                            <div className="-mt-1">Actions</div> <span className="material-symbols-outlined -mb-6 pl-1 -mr-1">
                                arrow_drop_down
                            </span></button>
                        <div className={`py-2 border border-r-2 border-gray-300 z-[8] bg-white ${actions ? "absolute" : "hidden"}`}>
                            <p onClick={editAndActions} className="pl-3 pr-5 py-1 hover:bg-extralightblue">Rename</p>
                            <p onClick={preDeleteAndActions} className="pl-3 pr-5 py-1 hover:bg-extralightblue">Delete</p>
                        </div>
                    </div>
                </div>



                <div className="sm:row-span-2 sm:col-span-5 sm:col-start-2" >
                    <Box title="Basic Info"
                        contents={<CustomerInfo wsurl={wsurl} customer={customer} id={id} setCustomer={setCustomer} />}
                    />
                </div>

                <div className="sm:col-span-5 sm:col-start-7">
                    <Box title="Financial"
                        contents={<CustomerFinancial wsurl={wsurl} customer={customer} id={id} setCustomer={setCustomer} />}
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

            <div className={`${preDelete ? "fixed top-0" : "hidden"} flex w-full h-full bg-gray-400 bg-opacity-75 z-20`}>
                <div className="m-auto w-[40rem] bg-white flex flex-col justify-between rounded-3xl">
                    <p className="text-2xl font-semibold m-10">Delete Customer?</p>
                    <p className="mx-10">Are you sure you want to delete <span className="font-semibold">{customer.name}</span>?</p>
                    <div className="flex justify-end m-10">
                        <button onClick={togglePreDelete}>Cancel</button>
                        <button onClick={handleDeleteCustomer} className="ml-10 text-white bg-red">Delete</button>
                    </div>
                </div>
            </div>
        </>

    ) : null
}  