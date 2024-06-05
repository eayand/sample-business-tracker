import { Link, useLocation, useParams } from 'react-router-dom'
import { useState } from 'react'
import * as userService from '../../utilities/users-service'
import UserActions from '../UserActions/UserActions'

export default function NavBar({ user, setUser }) {
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const toggleHamburger = () => {
        setHamburgerOpen(!hamburgerOpen)
    }
    const location = useLocation()
    const pathSegments = location.pathname.split('/')
    const wsurl = pathSegments[2]

    return (
        <>
            {
                location.pathname === '/' ? null
                    :
                    <nav className="navigation py-2">
                        <div className="fullNav flex justify-center space-x-8">
                            <div><Link to={`/brokers/${wsurl}`}>Brokers</Link></div>
                            <div><Link to={`/customers/${wsurl}`}>Customers</Link></div>
                            <div><Link to={`/dashboard/${wsurl}`}>Dashboard</Link></div>
                        </div>

                        <div className="hamburger" onClick={toggleHamburger}><span className="material-symbols-outlined">{`${hamburgerOpen ? 'close' : 'menu'}`}</span></div>
                    </nav>
            }

            <style>{`

            .hamburger {
                display: none;
                z-index: 10;
            }

            @media (max-width: 500px) {
                .hamburger {
                    display: inline;
                    position: fixed;
                    z-index: 10;
                }

                .fullNav {
                    display: ${hamburgerOpen ? 'flex' : 'none'};
                    flex-direction: column;
                    justify-content: space-evenly;
                    font-size: 2rem;
                    background-color: #fff;
                    height: 95vh;
                    width: 95vw;
                    position: absolute;
                }
            }

        `}</style>
        </>
    )
}

