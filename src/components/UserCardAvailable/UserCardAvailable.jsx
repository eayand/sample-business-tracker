import * as usersAPI from "../../utilities/users-api"

export default function UserCard({user, id, workspaceId}) {

    // async function handleRemoveWorkspace(event) {
    //     event.preventDefault()
    //     await usersAPI.removeWorkspace({workspaceId, userId: user._id})
    // }

    async function handleAddWorkspace(event) {
        event.preventDefault()
        await usersAPI.addWorkspace({id, workspaceId, userId: user._id})
    }

    return (
        <div className="outline">
            <p>{user.name}</p>
            <form action="">
                <input type="hidden" name="workspace" value={workspaceId} />
                <input type="hidden" name="userId" value={user._id} />
                <button type="submit" onClick={handleAddWorkspace}>Add to This Workspace</button>
            </form>
        </div>
    )
}