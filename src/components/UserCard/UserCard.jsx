import * as usersAPI from "../../utilities/users-api"

export default function UserCard({user, id}) {

    async function handleRemoveWorkspace(event) {
        event.preventDefault()
        await usersAPI.removeWorkspace(id, {userId: user._id})
    }

    return (
        <div className="outline">
            <p>{user.name}</p>
            <form action="">
                <input type="hidden" name="user" value={user._id} />
                <button className="pre-delete"  type="submit" onClick={handleRemoveWorkspace}>Remove from This Workspace</button>
            </form>
        </div>
    )
}