import { Link } from "react-router-dom"

export default function UserRow({user}) {
    return (
        <tr>
            <td className="first-column">{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.workspace.length}</td>
            <td>{user.createdAt}</td>
        </tr>
    )
}