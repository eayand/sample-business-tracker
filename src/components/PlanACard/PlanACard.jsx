import { useState, useEffect } from "react"
import * as plansAAPI from '../../utilities/plans-A-api'
import * as usersAPI from '../../utilities/users-api'

export default function PlanACard({ plan, updatePlansA, wsurl }) {

    const id = plan._id

    const [availableExperts, setAvailableExperts] = useState([])

    const [form, setForm] = useState({
        name: plan.name,
        expert: plan.expert,
        amount: plan.amount,
        system: plan.system,
    })

    useEffect(function () {
        (async () => setAvailableExperts(await usersAPI.indexNotThisPlanAsExpert(wsurl, id)))()
    }, [plan])

    const [benefitCategoriesForm, setBenefitCategoriesForm] = useState({
        commuter: plan.commuterBool,
        fitness: plan.fitnessBool,
        leisure: plan.leisureBool,
        medical: plan.medicalBool,
    })

    const [remindersForm, setRemindersForm] = useState({
        email: plan.emailBool,
        paper: plan.paperBool,
        none: plan.noneBool,
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

    function benefitCategoriesHandleChange(event) {
        const newBenefitCategoriesFormData = {
            ...benefitCategoriesForm,
            [event.target.name]: !benefitCategoriesForm[event.target.name]
        }
        setBenefitCategoriesForm(newBenefitCategoriesFormData)
    }

    function remindersHandleChange(event) {
        const newRemindersFormData = {
            ...remindersForm,
            [event.target.name]: !remindersForm[event.target.name]
        }
        setRemindersForm(newRemindersFormData)
    }

    async function handleUpdatePlan(event) {
        event.preventDefault()
        const benefitCategoriesSelected = []
        const remindersSelected = []
        for (let key in benefitCategoriesForm) {
            if (benefitCategoriesForm[key] === true) {
                benefitCategoriesSelected.push(key)
            }
        }
        for (let key in remindersForm) {
            if (remindersForm[key] === true) {
                remindersSelected.push(key)
            }
        }
        console.log(benefitCategoriesSelected, remindersSelected)
        form.benefitCategories = benefitCategoriesSelected
        form.reminders = remindersSelected
        const updatedPlan = await plansAAPI.updatePlan(wsurl, id, form)
        updatePlansA(updatedPlan)
        toggleEdit()
    }

    async function handleDeletePlan() {
        await plansAAPI.deletePlanA(wsurl, id)
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
                            <input type="number" name="amount" value={form.amount} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1" />

                            <label>System</label>
                            <select name="system" value={form.system} onChange={handleChange} className="mx-5 my-2 w-80 border border-theme px-2 py-1">
                                <option value=""></option>
                                <option value="Legacy">Legacy</option>
                                <option value="Millenium">Millenium</option>
                            </select><br />

                            <fieldset className="mt-2">
                                <legend>Benefit Categories</legend>
                                <div>
                                    <input type="checkbox" id="commuter" name="commuter" value={benefitCategoriesForm.commuter} onChange={benefitCategoriesHandleChange} checked={benefitCategoriesForm.commuter}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="commuter">commuter</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="fitness" name="fitness" value={benefitCategoriesForm.fitness} onChange={benefitCategoriesHandleChange} checked={benefitCategoriesForm.fitness}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="fitness">fitness</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="leisure" name="leisure" value={benefitCategoriesForm.leisure} onChange={benefitCategoriesHandleChange} checked={benefitCategoriesForm.leisure}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="leisure">leisure</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="medical" name="medical" value={benefitCategoriesForm.medical} onChange={benefitCategoriesHandleChange} checked={benefitCategoriesForm.medical}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="medical">medical</label>
                                </div>
                            </fieldset>

                            <fieldset className="mt-2">
                                <legend>Reminders</legend>
                                <div>
                                    <input type="checkbox" id="email" name="email" value={true} onChange={remindersHandleChange} checked={remindersForm.email}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="email">email</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="paper" name="paper" value={true} onChange={remindersHandleChange} checked={remindersForm.paper}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="paper">paper</label>
                                </div>
                                <div>
                                    <input type="checkbox" id="none" name="none" value={true} onChange={remindersHandleChange} checked={remindersForm.none}
                                        className="ml-6 mr-3 mb-3 h-5 w-5" />
                                    <label htmlFor="none">none</label>
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
                            <p className="mb-3 h-8">{plan.expert ? plan.expert.name : ""}</p>
                            <label className="text-bluetext">Amount</label>
                            <p className="mb-3 h-8">{plan.fAmount}</p>
                            <label className="text-bluetext">System</label>
                            <p className="mb-3 h-8">{plan.system}</p>
                            <label className="text-bluetext">Benefit Categories</label>
                            <p className="mb-3 h-8">{plan.benefitCategories.sort().join(', ')}</p>
                            <label className="text-bluetext">Reminders</label>
                            <p className="mb-3 h-8">{plan.reminders.sort().join(', ')}</p>
                        </div>
                    </>
            }
        </div>
    ) : null
}