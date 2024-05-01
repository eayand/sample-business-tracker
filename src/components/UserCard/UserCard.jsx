import * as usersAPI from "../../utilities/users-api"

export default function UserCard({user, workspaceId}) {

    async function handleAddWorkspace(event) {
        event.preventDefault()
        await usersAPI.addWorkspace({workspaceId, userId: user._id})
    }
    return (
        <div>
            <p>{user.name}</p>
            <p>{workspaceId}</p>
            <form action="">
                <input type="hidden" name="workspace" value={workspaceId} />
                <input type="hidden" name="userId" value={user._id} />
                <button type="submit" onClick={handleAddWorkspace}>Add to This Workspace</button>
            </form>
        </div>
    )
}