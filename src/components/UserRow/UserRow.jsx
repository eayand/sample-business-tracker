import { Link } from "react-router-dom"

export default function UserRow({user}) {

    const workspaces = user.workspace.map((ws) => <p>{ws.name}</p>)

    return (
        <tr className="odd:bg-lightgreen">
            <td className="first-column">{user.name}</td>
            <td className="px-8 py-2">{user.email}</td>
            <td className="px-8 py-2">{user.role}</td>
            <td className="px-8 py-2">{workspaces}</td>
            <td className="px-8 py-2">{user.createdAt}</td>
        </tr>
    )
}