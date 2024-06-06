import {Link} from 'react-router-dom'
import { useState } from 'react'
import * as userService from '../../utilities/users-service'

export default function UserActions({user, setUser}) {
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const toggleUserMenu = () => {
        setUserMenuOpen(!userMenuOpen)
    }

    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <>

        <div 
        className="absolute right-3 top-3" >
            <div onClick={toggleUserMenu}
            className="bg-interactable w-16 h-16 p-2 rounded-full flex justify-center items-center" >
                <div>
                    {user.initials}
                </div>
            </div>
            <div
            className="userMenu shadow-md absolute right-3 w-32" >
                <div 
                className="text-sm text-center" >{user.name}</div>
                <Link to="/" onClick={toggleUserMenu}>Home</Link>
                <p>Edit Profile</p>
                <Link onClick={handleLogOut}>Log Out</Link>
            </div>
        </div>



        <style>{`
                .userMenu {
                    display: ${userMenuOpen ? 'flex' : 'none'};
                    flex-direction: column;
                    justify-content: space-evenly;
                    background-color: #fff;
                    z-index: 10;
                }
        `}</style>
        </>
    )
}

