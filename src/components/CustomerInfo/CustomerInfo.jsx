import { useEffect, useState } from "react"
import * as customersAPI from '../../utilities/customers-api'
import * as usersAPI from '../../utilities/users-api'

export default function CustomerInfo({ wsurl, customer, id, setCustomer }) {

    const [availableAMs, setAvailableAMs] = useState([])

    const [form, setForm] = useState({
        accountManager: customer.accountManager,
        website: customer.website,
        phone: customer.phone,
        tax: customer.tax,
        address: customer.address,
        joinedMonth: customer.joinedMonth,
        joinedDay: customer.joinedDay,
        joinedYear: customer.joinedYear,
        renewal: customer.renewal,
    })

    useEffect(function () {
        (async () => setAvailableAMs(await usersAPI.indexNotThisCustomersAM(wsurl, id)))();
    }, [customer.accountManager])

    const [edit, setEdit] = useState(false)
    const toggleEdit = () => {
        setEdit(!edit)
    }

    const [phoneInvalid, setPhoneInvalid] = useState(false)
    const [taxInvalid, setTaxInvalid] = useState(false)

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        if (newFormData.phone) {
            if (newFormData.phone.match(/^\d{10}$/)) {
                setPhoneInvalid(false)
            } else if (newFormData.phone === '') {
                setPhoneInvalid(false)
            } else {
                setPhoneInvalid(true)
            }
        }
        setForm(newFormData)
        console.log(customer.accountManager)
    }

    async function handleUpdateCustomer(event) {
        event.preventDefault()
        const customer = await customersAPI.updateCustomer(wsurl, id, form)
        setCustomer(customer)
        toggleEdit()
    }

    const dropdown = availableAMs.map(a => <option value={a._id} key={a._id} className="w-full">{a.name}</option>)

    return (
        <>
            {
                edit ?
                    <>
                        <form>
                            <label>Account Manager</label>
                            <select name="accountManager" value={form.accountManager} onChange={handleChange}
                                className="mb-2 w-full border border-theme px-2 py-1">
                                <option value="">(remove account manager)</option>
                                {dropdown}
                                </select>

                            <label>Website</label>
                            <input name="website" value={form.website} onChange={handleChange}
                                className="mb-2 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />

                            <label>Primary Phone Number</label>
                            <p className={`text-red ${phoneInvalid ? "relative" : "hidden"}`}>* Enter 10 digits only.</p>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} pattern="[0-9]{10}" title="must be ten digits"
                                className="mb-2 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />

                            <label>Tax ID</label>
                            <input name="tax" value={form.tax} onChange={handleChange} pattern="[0-9]{9}"
                                className="mb-2 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />

                            <label>Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange}
                                className="mb-2 w-full border border-theme px-2 py-1" />

                            <fieldset className="flex gap-2 align-center">
                                <legend>Joined</legend>

                                <label>Month</label>
                                <input type="number" name="joinedMonth" value={form.joinedMonth} onChange={handleChange}
                                    className="mb-2 mr-8 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />

                                <label>Day</label>
                                <input type="number" name="joinedDay" value={form.joinedDay} onChange={handleChange}
                                    className="mb-2 mr-8 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />

                                <label>Year</label>
                                <input type="number" name="joinedYear" value={form.joinedYear} onChange={handleChange}
                                    className="mb-2 w-full border border-theme px-2 py-1" data-ignore="true" data-1p-ignore="true" />
                            </fieldset>


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
                        <p className="mb-3 h-8">{ customer.accountManager ? customer.accountManager.name : ""}</p>

                        <label className="text-bluetext">Website</label>
                        <p className="mb-3 h-8">{customer.website}</p>

                        <label className="text-bluetext">Primary Phone Number</label>
                        <p className="mb-3 h-8">{customer.fPhone}</p>

                        <label className="text-bluetext">Tax ID</label>
                        <p className="mb-3 h-8">{customer.fTax}</p>

                        <label className="text-bluetext">Address</label>
                        <p className="mb-3 h-8">{customer.address}</p>

                        <label className="text-bluetext">Joined</label>
                        <p className="mb-3 h-8">{customer.fJoined}</p>

                        <label className="text-bluetext">Renewal</label>
                        <p className="mb-3 h-8">{customer.renewal}</p>
                    </>
            }
        </>
    )

}