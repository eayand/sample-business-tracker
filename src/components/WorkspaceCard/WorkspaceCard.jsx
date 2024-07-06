import { Link } from "react-router-dom";

export default function WorkspaceCard({ workspace }) {
    return (

        <div
            className="border-2 border-theme p-2 w-80">

            <p
                className="font-bold" >
                {workspace.name}
            </p>
            <p>{workspace.description}</p>

            <div
                className="flex justify-evenly m-3" >

                <Link to={`/customers/${workspace.customURL}?page=1`}>
                    <button>Log In</button>
                </Link>

                <Link to={`/workspaces/${workspace._id}`}>
                    <button>Manage</button>
                </Link>

            </div>

        </div>

    )
}