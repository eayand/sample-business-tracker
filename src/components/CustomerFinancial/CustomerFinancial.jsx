import { useState } from "react"
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerFinancial({ wsurl, customer, id, setCustomer }) {

    const [form, setForm] = useState({
        commission1: customer.commission1,
        commission2: customer.commission2,
    })

    const [edit, setEdit] = useState(false)

    const toggleEdit = () => {
        setEdit(!edit)
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


    return (
        <>
            {
                edit ?
                    <>
                        <form>
                            <label>Commission 1</label>
                            <input type="number" name="commission1" value={form.commission1} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Commission 2</label>
                            <input type="number" name="commission2" value={form.commission2} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />
                        </form>
                        <div>
                            <button type="submit" onClick={handleUpdateCustomer}>SAVE</button>
                            <button onClick={toggleEdit}>CANCEL</button>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex justify-end -mt-3 -mr-1" >
                            <button type="button" onClick={toggleEdit} className="h-7 w-7 p-0">
                                <span className="material-symbols-outlined text-2xl leading-7" >
                                    edit
                                </span>
                            </button>
                        </div>

                        <label className="text-bluetext">Commission 1</label>
                        <p className="mb-3 h-8">{customer.fCommission1}</p>
                        <label className="text-bluetext">Commission 2</label>
                        <p className="mb-3 h-8">{customer.fCommission2}</p>
                    </>
            }
        </>
    )
}