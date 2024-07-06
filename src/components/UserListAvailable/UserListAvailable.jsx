import UserCardAvailable from "../UserCardAvailable/UserCardAvailable";

export default function UserListAvailable({availableUsers, id, setAvailableUsers, users, setUsers}) {

    const userList = availableUsers.map((user) => <UserCardAvailable user={user} id={id} key={user._id} setAvailableUsers={setAvailableUsers} availableUsers={availableUsers} users={users} setUsers={setUsers} />)
    return (
        <div className="flex gap-4 flex-wrap">{userList}</div>
    )
}