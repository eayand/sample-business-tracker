import WorkspaceCard from "../WorkspaceCard/WorkspaceCard";

export default function WorkspaceList({workspaces}) {
    const workspaceList = workspaces.map((workspace) => < WorkspaceCard workspace={workspace} key={workspace._id}/>)
    return (
        <div className="flex flex-wrap gap-4">{workspaceList}</div>
    )
}