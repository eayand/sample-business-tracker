import { useState, useEffect } from "react"
import * as plansAAPI from '../../utilities/plans-A-api'

export default function PlanCard({plan}) {

    const id = plan.id

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
        await plansAAPI.updatePlan(id, form)
        toggleEdit()
    }

    async function handleDeletePlan() {
        await plansAAPI.deletePlanA(id)
    }

    return plan ? (
        <div className="card plan-card">

            {
                edit ? 
                <>
                    <form className="big-form">

                    <label>Plan Name</label>
                    <input name="name" value={form.name} onChange={handleChange} />

                    <label>Expert</label>
                    <select name="expert" value={form.expert} onChange={handleChange}>
                        <option value=""></option>
                    </select><br />

                    <label>Amount</label>
                    <input type="number" name="amount" value={form.amount} onChange={handleChange} />

                    <label>System</label>
                    <select name="system" value={form.system} onChange={handleChange}>
                        <option value="" selected></option>
                        <option value="Legacy">Legacy</option>
                        <option value="Millenium">Millenium</option>
                    </select><br />

                    <label>Benefit Categories</label>
                    <select multiple name="benefitCategories" value={form.benefitCategories} onChange={handleChange}>
                        <option value="" selected></option>
                        <option value="commuter">commuter</option>
                        <option value="fitness">fitness</option>
                        <option value="leisure">leisure</option>
                        <option value="medical">medical</option>
                    </select><br />

                    <label>Reminders</label>
                    <select multiple name="reminders" value={form.reminders} onChange={handleChange}>
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
                    <div className="flex full-width">
                        <div><label>{plan.type} </label>{plan.name} </div>
                        <div><label>Expert: </label>{plan.expert}</div>
                    </div>
                    <div className="flex-col full-width">
                        <label>Amount</label>
                        <p>{plan.amount}</p>
                        <label>System</label>
                        <p>{plan.system}</p>
                        <label>Benefit Categories</label>
                        <p>{plan.benefitCategories}</p>
                        <label>Reminders</label>
                        <p>{plan.reminders}</p>
                        <button onClick={toggleEdit}>EDIT</button>
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