import { useState, useEffect } from "react"
import * as plansBAPI from '../../utilities/plans-B-api'
import * as usersAPI from '../../utilities/users-api'

export default function PlanBCard({ plan, updatePlansB, wsurl }) {

    const id = plan._id

    const [availableExperts, setAvailableExperts] = useState([])

    const [form, setForm] = useState({
        name: plan.name,
        expert: plan.expert,
        amount: plan.amount,
        system: plan.system,
        autoRenew: plan.autoRenew,
    })

    useEffect(function () {
        (async () => setAvailableExperts(await usersAPI.indexNotThisPlanBsExpert(wsurl, id)))()
    }, [plan])

    const [edit, setEdit] = useState(false)
    const [preDelete, setPreDelete] = useState(false)

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const togglePreDelete = () => {
        setPreDelete(!preDelete)
    }

    function handleChange(event) {
        const newFormData = {
            ...form,
            [event.target.name]: event.target.value
        }
        setForm(newFormData)
    }

    async function handleUpdatePlan(event) {
        event.preventDefault()
        const updatedPlan = await plansBAPI.updatePlan(wsurl, id, form)
        updatePlansB(updatedPlan)
        toggleEdit()
    }

    async function handleDeletePlan() {
        await plansBAPI.deletePlanB(wsurl, id)
    }

    const dropdown = availableExperts.map(e => <option value={e._id} key={e._id} className="w-full" >{e.name}</option>)

    return plan ? (
        <div className="border border-bluetext p-4 m-4 w-full sm:w-96">

            {
                edit ?
                    <>
                        <form>

                            <label>Plan Name</label>
                            <input name="name" value={form.name} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1" />

                            <label>Expert</label>
                            <select name="expert" value={form.expert} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                {plan.expert ? <option value={plan.expert._id}>{plan.expert.name}</option> : null}
                                <option value=""></option>
                                {dropdown}
                            </select><br />

                            <label>Amount</label>
                            <select name="amount" value={form.amount} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value={0} selected></option>
                                <option value={500}>$500</option>
                                <option value={550}>$550</option>
                                <option value={600}>$600</option>
                                <option value={650}>$650</option>
                            </select><br />

                            <label>System</label>
                            <select name="system" value={form.system} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value="" selected></option>
                                <option value="Legacy">Legacy</option>
                                <option value="Millenium">Millenium</option>
                            </select><br />

                            <label>Auto Renew</label>
                            <select name="autoRenew" value={form.autoRenew} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value={true} selected>Yes</option>
                                <option value={false}>No</option>
                            </select><br />

                        </form>

                        <button type="submit" onClick={handleUpdatePlan}>SAVE</button>
                        <button onClick={toggleEdit}>CANCEL</button>

                        {
                            preDelete ?
                                <>
                                    <p>Are you sure you want to delete {plan.type} {plan.name}?</p>
                                    <button onClick={togglePreDelete}>Cancel</button>
                                    <button onClick={handleDeletePlan}>Delete</button>
                                    <br />
                                </>
                                :
                                <>
                                    <button className="pre-delete" onClick={togglePreDelete}>DELETE THIS PLAN</button>
                                </>
                        }
                    </>
                    :
                    <>
                        <div className="flex justify-between">
                            <div><label className="font-semibold">{plan.type} </label></div>
                            <button type="button" onClick={toggleEdit} className="h-7 w-7 p-0">
                                <span className="material-symbols-outlined text-2xl leading-7">
                                    edit
                                </span>
                            </button>
                        </div>
                        <div>{plan.name}</div>
                        <br />
                        <div className="flex-col full-width">
                            <label className="text-bluetext">Expert</label>
                            <p className="mb-3 h-8">{plan.expert ? plan.expert.name : ""}</p>
                            <label className="text-bluetext">Amount</label>
                            <p className="mb-3 h-8">{plan.fAmount}</p>
                            <label className="text-bluetext">System</label>
                            <p className="mb-3 h-8">{plan.system}</p>
                            <label className="text-bluetext">Auto Renew</label>
                            <p className="mb-3 h-8">{plan.fAutoRenew}</p>
                        </div>
                    </>
            }
        </div>
    ) : null
}