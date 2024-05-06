import WorkspaceCardUser from "../WorkspaceCardUser/WorkspaceCardUser";

export default function WorkspaceListUser({workspaces}) {
    const workspaceCards = workspaces.map((workspace) => < WorkspaceCardUser workspace={workspace} key={workspace._id}/>)
    return (
        <div className="flex">{workspaceCards}</div>
    )
}