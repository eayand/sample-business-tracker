import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as plansAAPI from '../../utilities/plans-A-api'
import PlanCard from "../PlanCard/PlanCard"

export default function PlanCardContainer({customer, id}) {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        customer: customer,
        name: 'unnamed',
    })

    const [select, setSelect] = useState('')

    function handleChange(event) {
        const selection = event.target.value
        setSelect(selection)
    }

    async function handleCreatePlanA(event) {
        event.preventDefault()
        await plansAAPI.createPlanA(id, form)
        //add redirect to newly created plan's detail page
    }

    function direct(event) {
        if (select === 'A') {
            handleCreatePlanA(event)
        } else if (select === 'B') {
            //plan B info here
        }
    }


    const [plansA, setPlansA] = useState([])

    useEffect(function() {
        (async () => setPlansA(await plansAAPI.getPlans(id)))();
    }, [])

    const planACards = plansA.map((plan) => <PlanCard plan={plan} key={plan._id} id={id} /> )


    return (
        <>
        <p>Create a Plan:</p>
        <form>
            <label>Type</label>
            <select name="type" value={select} onChange={handleChange}>
                <option value="" selected></option>
                <option value="A">Type A</option>
                <option value="B">Type B</option>
            </select>
            <button type="submit" onClick={direct}>Create Plan</button>
        </form>
        <div className="flex-even">
            {planACards}
        </div>
        </>
    )
}