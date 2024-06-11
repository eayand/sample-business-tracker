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

                        <div className="full-burger flex justify-center pt-8 sm:pt-0">

                            <div className="menu-item w-full sm:w-40 text-center" ><Link to={`/brokers/${wsurl}`} onClick={toggleHamburger}>Brokers</Link></div>
                            <div className="menu-item w-full sm:w-40 text-center"><Link to={`/customers/${wsurl}?page=1`} onClick={toggleHamburger}>Customers</Link></div>
                            <div className="menu-item w-full sm:w-40 text-center"><Link to={`/dashboard/${wsurl}`} onClick={toggleHamburger}>Dashboard</Link></div>

                        </div>

                        <div className="hamburger pl-3" onClick={toggleHamburger}>
                            <span className="material-symbols-outlined text-3xl">{`${hamburgerOpen ? 'close' : 'menu'}`}</span>
                        </div>

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

                .full-burger {
                    display: ${hamburgerOpen ? 'flex' : 'none'};
                    flex-direction: column;
                    justify-content: flex-start;
                    font-size: 2rem;
                    background-color: #fff;
                    height: 100vh;
                    width: 100vw;
                    position: fixed;
                    z-index: 10;
                }

                .menu-item {
                    padding: 1rem;
                }
            }

        `}</style>
        </>
    )
}

