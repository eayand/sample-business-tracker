import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as plansAAPI from '../../utilities/plans-A-api'
import PlanCard from "../PlanCard/PlanCard"

export default function PlanContainer({customer, customerId, wsurl}) {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        customer: customerId,
        name: 'unnamed',
    })

    const [select, setSelect] = useState('')

    const [plansA, setPlansA] = useState([])

    function handleChange(event) {
        const selection = event.target.value
        setSelect(selection)
    }
    
    useEffect(function() {
        (async () => setPlansA(await plansAAPI.getPlans(wsurl, customerId)))();
    }, [])

    async function handleCreatePlanA(event) {
        event.preventDefault()
        const plan = await plansAAPI.createPlanA(wsurl, form)
        setPlansA([...plansA, plan])
        
    }

    function direct(event) {
        if (select === 'A') {
            handleCreatePlanA(event)
        } else if (select === 'B') {
            //plan B info here
        }
        setSelect("")
    }

    function updatePlansA(planA) {
        const newPlanList = [...plansA]
        const planIndex = newPlanList.findIndex((plan) => plan._id === planA._id)
        newPlanList[planIndex] = planA
        setPlansA(newPlanList)
    }



    const planCards = plansA.map((plan) => <PlanCard plan={plan} key={plan._id} customerId={customerId} updatePlansA={updatePlansA} /> )


    return (
        <>
            <form className="flex justify-end mx-4">
                <select name="type" value={select} onChange={handleChange} required className="border border-2 border-bluetext min-w-40 focus:bg-extralightblue">
                    <option value="" selected></option>
                    <option value="A">Type A</option>
                    <option value="B">Type B</option>
                </select>
                <button type="submit" onClick={direct} className="ml-4 text-nowrap">Create Plan</button>
            </form>
    
        <div className="flex justify-center sm:justify-start">
            {planCards}
        </div>
        </>
    )
}