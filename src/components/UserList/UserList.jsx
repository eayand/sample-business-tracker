import UserCard from "../UserCard/UserCard";

export default function UserList({users, id}) {
    const userList = users.map((user) => <UserCard user={user} id={id} key={user._id}/>)
    return (
        <div className="flex">{userList}</div>
    )
}