import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({setUser}) {
    return (
        <main
        className="h-screen flex flex-col sm:flex-row" >

            <div 
            className="inline-block sm:block bg-lightyellow sm:bg-lightblue w-full sm:w-1/2 text-center p-8">
                <h1 
                className="css-lg">This Is a Demo</h1>
                <br />

                <p
                className="text-left">
                    This site is an example of a tool for keeping track of interactions between a service provider, their customers, and their brokers.
                </p>
                <br />

                <p className="text-left">When you sign up...</p>
                <ul
                className="list-disc sm:px-20 text-left">
                    <li 
                    className="p-4">
                        You are an admin and can create users. Each account you create must have a <strong>unique email address</strong>. If you want to use example@abc.com but someone has already used it, you will not be able to create an account for that address.
                    </li>
                    <li 
                    className="p-4">
                        <strong>Do not enter sensitive information</strong> in your demo account. It is set up for easy access, not maximum security.
                    </li>
                    <li 
                    className="p-4">
                        Your demo account will be <strong>automatically deleted</strong> after two weeks.
                    </li>
                </ul>
                <br />

            </div>

            <div 
            className=" flex flex-col text-center pt-8 sm:mt-8 w-full sm:w-1/2 sm:px-8">
                <LoginForm setUser={setUser}/>
                <SignUpForm setUser={setUser}/>
            </div>

        </main>
    )
}