import UserCard from "../UserCard/UserCard";

export default function UserList({users, workspaceId}) {
    const userList = users.map((user) => <UserCard user={user} workspaceId={workspaceId} key={user._id}/>)
    return (
        <div>{userList}</div>
    )
}