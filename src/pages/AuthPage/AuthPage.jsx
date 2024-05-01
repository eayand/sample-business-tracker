import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({setUser}) {
    return (
        <main>
            <h1>Log In:</h1>
            <LoginForm setUser={setUser}/>
            <h1>Sign Up:</h1>
            <SignUpForm setUser={setUser}/>
        </main>
    )
}