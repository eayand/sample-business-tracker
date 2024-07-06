import UserRow from "../UserRow/UserRow"

export default function UserTable({users}) {
    const userTable = users.map((user) => <UserRow user={user} key={user._id}/>)
    return (
        <table>
            <thead >
                <tr>
                    <th className="first-column">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Workspace</th>
                    <th>Created</th>
                </tr>
            </thead>
            <tbody>{userTable}</tbody>
        </table>
    )
}