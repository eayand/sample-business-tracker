import { useState } from "react"
import * as customersAPI from '../../utilities/customers-api'

export default function CustomerInfo({ wsurl, customer, id, setCustomer}) {

    const [form, setForm] = useState({
        accountManager: customer.accountManager,
        website: customer.website,
        phone: customer.phone,
        taxId: customer.tax,
        address: customer.address,
        joined: customer.joined,
        renewal: customer.renewal,
    })

    const [edit, setEdit] = useState(false)
    const toggleEdit = () => {
        setEdit(!edit)
    }

    const [phoneInvalid, setPhoneInvalid] = useState(false)

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        if (newFormData.phone.match(/^\d{10}$/)) {
            setPhoneInvalid(false)
        } else if (newFormData.phone === '') {
            newFormData.phone = null
            setPhoneInvalid(false)
        } else {
            setPhoneInvalid(true)
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
                            <label>Account Manager</label>
                            <input name="accountManager" value={form.accountManager} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Website</label>
                            <input name="website" value={form.website} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Primary Phone Number</label>
                            <p className={`text-red ${phoneInvalid ? "relative" : "hidden"}`}>* Must be 10 digits</p>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} pattern="[0-9]{10}" title="must be ten digits"
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Tax ID</label>
                            <input name="tax" value={form.tax} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Joined</label>
                            <input type="date" name="joined" value={form.joined} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Renewal</label>
                            <select name="renewal" value={form.renewal} onChange={handleChange} 
                            className="mb-2 w-full border border-theme px-2 py-1">
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

                        <label className="text-bluetext">Account Manager</label>
                        <p className="mb-3 h-8">{customer.accountManager}</p>

                        <label className="text-bluetext">Website</label>
                        <p className="mb-3 h-8">{customer.website}</p>

                        <label className="text-bluetext">Primary Phone Number</label>
                        <p className="mb-3 h-8">{customer.formatPhone}</p>

                        <label className="text-bluetext">Tax ID</label>
                        <p className="mb-3 h-8">{customer.tax}</p>

                        <label className="text-bluetext">Address</label>
                        <p className="mb-3 h-8">{customer.address}</p>

                        <label className="text-bluetext">Joined</label>
                        <p className="mb-3 h-8">{new Date(customer.joined).toLocaleDateString()}</p>

                        <label className="text-bluetext">Renewal</label>
                        <p className="mb-3 h-8">{customer.renewal}</p>
                    </>
            }
        </>
    )

}