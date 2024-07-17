import { useState } from "react"
import * as brokersAPI from '../../utilities/brokers-api'

export default function BrokerInfo({ wsurl, broker, id, setBroker }) {

    const [form, setForm] = useState({
        website: broker.website,
        phone: broker.phone,
        tax: broker.tax,
        address: broker.address,
    })

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
            validatePhone(newFormData.phone)
        }
        setForm(newFormData)
    }

    function validatePhone(newPhone) {
        if (newPhone.match(/^\d{10}$/)) {
            setPhoneInvalid(false)
        } else if (newPhone === '') {
            setPhoneInvalid(false)
        } else {
            setPhoneInvalid(true)
        }
    }

    async function handleUpdateBroker(event) {
        event.preventDefault()
        const broker = await brokersAPI.updateBroker(wsurl, id, form)
        setBroker(broker)
        toggleEdit()
    }

    return (
        <>

            {
                edit ?
                    <>
                        <form>
                            <label>Website</label>
                            <input name="website" value={form.website} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Primary Phone Number</label>
                            <p className={`text-red ${phoneInvalid ? "relative" : "hidden"}`}>* Enter 10 digits only.</p>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Tax ID</label>
                            <input name="tax" value={form.tax} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />

                            <label>Address</label>
                            <textarea name="address" value={form.address} onChange={handleChange} className="mb-2 w-full border border-theme px-2 py-1" />
                        </form>
                        <div>
                            <button type="submit" onClick={handleUpdateBroker}>SAVE</button>
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

                        <label className="text-yellowtext">Website</label>
                        <p className="mb-3 h-8">{broker.website}</p>
                        <label className="text-yellowtext">Primary Phone Number</label>
                        <p className="mb-3 h-8">{broker.fPhone}</p>
                        <label className="text-yellowtext">Tax ID</label>
                        <p className="mb-3 h-8">{broker.tax}</p>
                        <label className="text-yellowtext">Address</label>
                        <p className="mb-3 h-8">{broker.address}</p>
                    </>
            }

        </>
    )
}