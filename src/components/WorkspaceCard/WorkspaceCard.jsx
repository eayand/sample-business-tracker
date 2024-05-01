import { Link } from "react-router-dom";

export default function Workspace({workspace}) {
    return (
        <Link to={`/workspaces/${workspace._id}`}>
            <div>
                <p>{workspace.name}</p>
                <p>{workspace.description}</p>
            </div>
        </Link>
    )
}