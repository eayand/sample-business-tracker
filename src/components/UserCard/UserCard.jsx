import * as usersAPI from "../../utilities/users-api"

export default function UserCard({user, id, setUsers, users, availableUsers, setAvailableUsers}) {

    async function handleRemoveWorkspace(event) {
        event.preventDefault()
        const removedUser = await usersAPI.removeWorkspace(id, {userId: user._id}) 
        const userId = removedUser._id
        const index = users.findIndex((obj) => obj._id === userId)
        setUsers(users.toSpliced(index, 1))
        setAvailableUsers([...availableUsers, removedUser])
    }

    return (
        <div className="outline p-2">
            <p className="m-2">{user.name}</p>
            <form className="flex justify-center">
                <input type="hidden" name="user" value={user._id} />
                <button className=""  type="submit" onClick={handleRemoveWorkspace}>Remove</button>
            </form>
        </div>
    )
}