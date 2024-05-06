import { Link } from "react-router-dom";

export default function WorkspaceCardUser({workspace}) {
    return (
        <Link to={`${workspace.customURL}/customers`}>
            <div className="workspace-card">
                <h3>{workspace.name}</h3>
                <p>{workspace.description}</p>
            </div>
        </Link>
    )
}