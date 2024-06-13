import { useState, useEffect } from "react"
import * as plansAAPI from '../../utilities/plans-A-api'

export default function PlanCard({ plan, updatePlansA, wsurl }) {

    const id = plan._id

    // const [thisPlan, setThisPlan] = useState(null)
    // useEffect(function() {
    //     (async () => setThisPlan(await plansAAPI.planDetail(id)))();
    // }, [])

    const [form, setForm] = useState({
        name: plan.name,
        expert: plan.expert,
        amount: plan.amount,
        system: plan.system,
        benefitCategories: plan.benefitCategories,
        reminders: plan.reminders,
    })

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
        const updatedPlan = await plansAAPI.updatePlan(wsurl, id, form)
        updatePlansA(updatedPlan)
        toggleEdit()
    }

    async function handleDeletePlan() {
        await plansAAPI.deletePlanA(wsurl, id)
    }

    return plan ? (
        <div className="border border-bluetext p-4 m-4 w-full sm:w-96">

            {
                edit ?
                    <>
                        <form className="big-form">

                            <label>Plan Name</label>
                            <input name="name" value={form.name} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1"/>

                            <label>Expert</label>
                            <select name="expert" value={form.expert} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value=""></option>
                            </select><br />

                            <label>Amount</label>
                            <input type="number" name="amount" value={form.amount} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1"/>

                            <label>System</label>
                            <select name="system" value={form.system} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value="" selected></option>
                                <option value="Legacy">Legacy</option>
                                <option value="Millenium">Millenium</option>
                            </select><br />

                            <label>Benefit Categories</label>
                            <select multiple name="benefitCategories" value={form.benefitCategories} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value="" selected></option>
                                <option value="commuter">commuter</option>
                                <option value="fitness">fitness</option>
                                <option value="leisure">leisure</option>
                                <option value="medical">medical</option>
                            </select><br />

                            <label>Reminders</label>
                            <select multiple name="reminders" value={form.reminders} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value="" selected></option>
                                <option value="email">email</option>
                                <option value="paper">paper</option>
                                <option value="none">none</option>
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
                            <p className="mb-3 h-8">{plan.expert}</p>
                            <label className="text-bluetext">Amount</label>
                            <p className="mb-3 h-8">{plan.fAmount}</p>
                            <label className="text-bluetext">System</label>
                            <p className="mb-3 h-8">{plan.system}</p>
                            <label className="text-bluetext">Benefit Categories</label>
                            <p className="mb-3 h-8">{plan.benefitCategories}</p>
                            <label className="text-bluetext">Reminders</label>
                            <p className="mb-3 h-8">{plan.reminders}</p>
                        </div>
                    </>
            }
        </div>
    ) : null
}

// name
// amount
// system
// benefitCategories
// reminders
// expert
// customer