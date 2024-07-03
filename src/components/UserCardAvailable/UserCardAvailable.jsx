import * as usersAPI from "../../utilities/users-api"

export default function UserCard({user, id, workspaceId, setAvailableUsers, availableUsers, users, setUsers}) {


    async function handleAddWorkspace(event) {
        event.preventDefault()
        const addedUser = await usersAPI.addWorkspace({id, workspaceId, userId: user._id})
        const userId = addedUser._id
        const index = availableUsers.findIndex((obj) => obj._id === userId)
        setAvailableUsers(availableUsers.toSpliced(index, 1))
        setUsers([...users, addedUser])
    }

    return (
        <div className="outline p-2">
            <p className="m-2">{user.name}</p>
            <form className="flex justify-center">
                <input type="hidden" name="workspace" value={workspaceId} />
                <input type="hidden" name="userId" value={user._id} />
                <button type="submit" onClick={handleAddWorkspace}>Add</button>
            </form>
        </div>
    )
}