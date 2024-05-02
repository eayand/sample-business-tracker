import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as brokersAPI from '../../utilities/brokers-api';
import BrokerList from "../../components/BrokerList/BrokerList";


export default function BrokerListPage({user}) {
    const [brokers, setBrokers] = useState([])

    useEffect(function() {
        (async () => setBrokers(await brokersAPI.listBrokers()))()
    }, [] )

    return (
        <>
        <h1 className="align-left">Brokers <span>
            <Link to="/brokers/new"> 
                <button>Create New Broker</button> 
            </Link>
        </span></h1>
        
        <div className="chart-container">
            <BrokerList brokers={brokers}/>
        </div>
   
        </>
        
    )
}