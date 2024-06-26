import { Link } from "react-router-dom";

export default function Workspace({workspace}) {
    return (
        <Link to={`/workspaces/${workspace._id}`}>
            <div className="workspace-card">
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
            </div>
        </Link>
    )
}