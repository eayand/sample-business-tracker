import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'
import CustomerTable from "../../components/CustomerTable/CustomerTable";
import Pagination from "../../components/Pagination/Pagination";


export default function CustomerListPage({ user }) {

    const navigate = useNavigate()
    const { wsurl } = useParams()
    const url = new URL(window.location.href)
    const urlPage = new URL(document.location).searchParams
    const page = parseInt(urlPage.get('page'))
    const [customersData, setCustomersData] = useState({ pagination: {}, customers: [] })
    const [pageCount, setPageCount] = useState(0)

    const [form, setForm] = useState({
        workspace: undefined,
        name: undefined,
    })

    useEffect(function () {
        (async () => setCustomersData(await customersAPI.listCustomers(wsurl, page)))()
    }, [page])

    useEffect(() => {
        if (customersData) {
            setPageCount(customersData.pagination.pageCount)
        }
    }, [customersData])

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

    function turnPage(number) {
        url.searchParams.set('page', number);
        window.history.pushState(null, '', url.toString())
    }

    function handlePrevious() {
        if (page === 1) return
        // setPage(page - 1)
        navigate(`/customers/${wsurl}?page=${page-1}`)
        turnPage(page - 1)
    }
    
    function handleNext() {
        if (page === pageCount) return
        // setPage(page + 1)
        navigate(`/customers/${wsurl}?page=${page+1}`)
        turnPage(page + 1)
    }

    return (
        <>
            {user.workspace.length ?
                <>
                    <div className="flex flex-wrap justify-center lg:justify-between mx-20 pl-10 pr-20 pt-5">
                        <h1 className="font-bold text-3xl">Customers </h1>
                        <form className="flex flex-wrap justify-center lg:justify-right">
                            <div>
                                <input name="name" value={form.name} onChange={handleChange} required className="mx-5 my-2 lg:my-0 w-80 border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />
                            </div>
                            <div>
                                <button type="submit" onClick={handleCreateCustomer} className="my-2 lg:my-0 bg-green text-white">Create New Customer</button>
                            </div>
                        </form>
                    </div>

                    <div className="chart-container overflow-x-scroll mx-auto mt-6 border border-lightblue">
                        {
                            customersData.customers.length ?
                                <CustomerTable customers={customersData.customers} wsurl={wsurl} />
                                :
                                <p>Create a customer to get started.</p>
                        }
                    </div>
                    <Pagination textColor="text-bluetext" bgColor="bg-bluetext" section="customers" wsurl={wsurl} page={page} pageCount={pageCount} handlePrevious={handlePrevious} handleNext={handleNext} />
                </>
                :
                <div className="h-96 flex flex-col justify-center text-center text-3xl">Start by creating a workspace on your homepage.</div>
            }
        </>

    )
}