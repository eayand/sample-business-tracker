import {Link} from 'react-router-dom'
import * as userService from '../../utilities/users-service'

export default function NavBar({user, setUser}) {
    function handleLogOut() {
        userService.logOut()
        setUser(null)
    }
    return (
        <nav>
            <div>
                <Link onClick={handleLogOut}>Log Out</Link>
            </div>
            <div>
                <Link to="/orders">Order History</Link>
                &nbsp; | &nbsp;
                <Link to="/orders/new">New Order</Link>
            </div>
            <div className='loggedInUser'>{user.name}</div>
        </nav>
    )
}