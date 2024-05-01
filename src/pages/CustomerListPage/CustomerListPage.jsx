import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as customersAPI from '../../utilities/customers-api'
import CustomerCreatePage from "../../pages/CustomerCreatePage/CustomerCreatePage"
import CustomerList from "../../components/CustomerList/CustomerList";


export default function CustomerListPage({user}) {
    const [customers, setCustomers] = useState([])

    useEffect(function() {
        (async () => setCustomers(await customersAPI.listCustomers()))()
    }, [] )

    return (
        <>
        <h1 className="align-left">Customers <span><Link to="/customers/new"> <button>Create New Customer</button> </Link></span></h1>
        
        <div className="chart-container">
            <CustomerList customers={customers}/>
        </div>
   
        </>
        
    )
}