import UserCardAvailable from "../UserCardAvailable/UserCardAvailable";

export default function UserListAvailable({availableUsers, id}) {

    // console.log('LIST: ', users)

    const userList = availableUsers.map((user) => <UserCardAvailable user={user} id={id} key={user._id}/>)
    return (
        <div className="flex">{userList}</div>
    )
}