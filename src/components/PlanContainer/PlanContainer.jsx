import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as plansAAPI from '../../utilities/plans-A-api'
import PlanCard from "../PlanCard/PlanCard"

export default function PlanContainer({customer, customerId}) {

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
        (async () => setPlansA(await plansAAPI.getPlans(customerId)))();
    }, [])

    async function handleCreatePlanA(event) {
        event.preventDefault()
        const plan = await plansAAPI.createPlanA(form)
        setPlansA([...plansA, plan])
        
    }

    function direct(event) {
        if (select === 'A') {
            handleCreatePlanA(event)
        } else if (select === 'B') {
            //plan B info here
        }
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
        <div className="flex margin-b">
            <form className="flex-ctr-ctr">
                <select name="type" value={select} onChange={handleChange} required className="inline-input ii-small">
                    <option value="" selected></option>
                    <option value="A">Type A</option>
                    <option value="B">Type B</option>
                </select>
                <button type="submit" onClick={direct}>Create Plan</button>
            </form>
        </div>
        <div className="flex-cen">
            {planCards}
        </div>
        </>
    )
}