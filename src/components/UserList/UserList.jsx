import UserCard from "../UserCard/UserCard";

export default function UserList({users, id, setUsers, availableUsers, setAvailableUsers}) {
    const userList = users.map((user) => <UserCard user={user} id={id} key={user._id} setUsers={setUsers} users={users} availableUsers={availableUsers} setAvailableUsers={setAvailableUsers} />)
    return (
        <div className="flex gap-4 flex-wrap">{userList}</div>
    )
}