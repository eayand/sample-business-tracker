import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'
import CustomerTable from "../../components/CustomerTable/CustomerTable";
import Pagination from "../../components/Pagination/Pagination";


export default function CustomerListPage({ user }) {

    const navigate = useNavigate()
    const { wsurl } = useParams()
    const [customers, setCustomers] = useState([])
    const [form, setForm] = useState({
        workspace: undefined,
        name: undefined,
    })

    useEffect(function () {
        (async () => setCustomers(await customersAPI.listCustomers(wsurl)))()
    }, [])

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleCreateCustomer(event) {
        event.preventDefault()
        const customer = await customersAPI.createCustomer(wsurl, form)
        const customerId = customer._id
        navigate(`/customers/${wsurl}/${customerId}`)
    }

    return (
        <>
            {user.workspace.length ?
                <>
                    <div className="flex flex-wrap justify-center lg:justify-between mx-20 pl-10 pr-20 pt-5">
                        <h1 className="font-bold text-3xl">Customers </h1>
                        <form className="flex flex-wrap justify-center lg:justify-right">
                            <div>
                                <input name="name" value={form.name} onChange={handleChange} required className="mx-5 my-2 lg:my-0 w-80" data-ignore="true" data-1p-ignore="true" />
                            </div>
                            <div>
                                <button type="submit" onClick={handleCreateCustomer} className="my-2 lg:my-0 bg-green text-white">Create New Customer</button>
                            </div>
                        </form>
                    </div>

                    <div className="chart-container overflow-x-scroll mx-auto mt-6 border border-lightblue">
                        {
                            customers.length ?
                                <CustomerTable customers={customers} wsurl={wsurl} />
                                :
                                <p>Create a customer to get started.</p>
                        }
                    </div>
                    <Pagination />
                </>
                :
                <div className="h-96 flex flex-col justify-center text-center text-3xl">Start by creating a workspace on your homepage.</div>
            }
        </>

    )
}