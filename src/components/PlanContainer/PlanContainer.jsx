import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as plansAAPI from '../../utilities/plans-A-api'
import * as plansBAPI from '../../utilities/plans-B-api'

import PlanACard from "../PlanACard/PlanACard"
import PlanBCard from "../PlanBCard/PlanBCard"

export default function PlanContainer({ customer, customerId, wsurl }) {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        customer: customerId,
        name: 'unnamed',
    })

    const [select, setSelect] = useState('')

    const [plansA, setPlansA] = useState([])
    const [plansB, setPlansB] = useState([])

    function handleChange(event) {
        const selection = event.target.value
        setSelect(selection)
    }

    useEffect(function () {
        (async () => setPlansA(await plansAAPI.getPlans(wsurl, customerId)))();
        (async () => setPlansB(await plansBAPI.getPlans(wsurl, customerId)))();
    }, [])

    async function handleCreatePlanA(event) {
        event.preventDefault()
        const plan = await plansAAPI.createPlanA(wsurl, form)
        setPlansA([...plansA, plan])
    }

    async function handleCreatePlanB(event) {
        event.preventDefault()
        const plan = await plansBAPI.createPlanB(wsurl, form)
        setPlansB([...plansB, plan])
    }

    function direct(event) {
        if (select === 'A') {
            handleCreatePlanA(event)
        } else if (select === 'B') {
            handleCreatePlanB(event)
        }
        setSelect("")
    }

    function updatePlansA(planA) {
        const newPlanList = [...plansA]
        const planIndex = newPlanList.findIndex((plan) => plan._id === planA._id)
        newPlanList[planIndex] = planA
        setPlansA(newPlanList)
    }

    function updatePlansB(planB) {
        const newPlanList = [...plansB]
        const planIndex = newPlanList.findIndex((plan) => plan._id === planB._id)
        newPlanList[planIndex] = planB
        setPlansB(newPlanList)
    }



    const planACards = plansA.map((plan) => <PlanACard plan={plan} key={plan._id} customerId={customerId} updatePlansA={updatePlansA} />)

    const planBCards = plansB.map((plan) => <PlanBCard plan={plan} key={plan._id} customerId={customerId} updatePlansB={updatePlansB} />)


    return (
        <>
            <form className="flex justify-end mx-4">
                    <select name="type" value={select} onChange={handleChange} required className="border border-2 border-bluetext w-full max-w-60 focus:bg-extralightblue">
                        <option value=""></option>
                        <option value="A">Type A</option>
                        <option value="B">Type B</option>
                    </select>
                <button type="submit" onClick={direct} className="ml-4 text-nowrap">Create Plan</button>
            </form>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-start">
                {planACards}
                {planBCards}
            </div>
        </>
    )
}