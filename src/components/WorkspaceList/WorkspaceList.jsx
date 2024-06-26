import Workspace from "../WorkspaceCard/WorkspaceCard";

export default function WorkspaceList({workspaces}) {
    const workspaceList = workspaces.map((workspace) => < Workspace workspace={workspace} key={workspace._id}/>)
    return (
        <div className=" flex-ctr-ctr flex-col">{workspaceList}</div>
    )
}