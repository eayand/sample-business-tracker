import { useState, useEffect } from "react"
import * as plansAAPI from '../../utilities/plans-A-api'

export default function PlanACard({ plan, updatePlansA, wsurl }) {

    const id = plan._id

    const [form, setForm] = useState({
        name: plan.name,
        expert: plan.expert,
        amount: plan.amount,
        system: plan.system,
        benefitCategories: plan.benefitCategories,
        reminders: plan.reminders,
    })

    const [subForm, setSubForm] = useState({
        commuter: plan.commuterBool,
        fitness: false,
        leisure: false,
        medical: false,

        email: false,
        paper: false,
        name: false,
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

    function subHandleChange(event) {
        const newSubFormData = {
            ...subForm,
            [event.target.name]: !!event.target.value
        }
        setSubForm(newSubFormData)
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
            <p>{plan.commuterBool}</p>

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

                            <fieldset className="mt-2">
                                <legend>Benefit Categories</legend>
                                <div>
                                    <input type="checkbox" checked="false" id="commuter" name="commuter" value={subForm.commuter} onChange={subHandleChange}
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="commuter">commuter</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="fitness" name="fitness" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="fitness">fitness</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="leisure" name="leisure" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="leisure">leisure</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="medical" name="medical" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="medical">medical</label>
                                </div>
                            </fieldset>

                            <fieldset className="mt-2">
                                <legend>Reminders</legend>
                                <div>
                                    <input type="checkbox" id="email" name="email" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="email">email</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="paper" name="paper" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="paper">paper</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="none" name="none" 
                                    className="ml-6 mr-3 mb-3 h-5 w-5"/>
                                    <label for="none">none</label>
                                </div>
                            </fieldset><br />

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