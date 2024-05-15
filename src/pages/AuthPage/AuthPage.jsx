import SignUpForm from "../../components/SignUpForm/SignUpForm"
import LoginForm from "../../components/LoginForm/LoginForm"

export default function AuthPage({setUser}) {
    return (
        <main
        className="h-screen flex flex-col sm:flex-row" >

            <div 
            className="sm:block inline-block bg-lightyellow sm:bg-lightblue w-full sm:w-1/2 text-center p-8">
                <h1 
                className="css-lg">This Is a Demo</h1>
                <br />

                <p
                className="text-left">
                    This site is an example of a tool for keeping track of interactions between a service provider, their customers, and their brokers.
                </p>
                <br />

                <p
                className="text-left">
                    Click "Take a Tour" below to get introduced to the features, or sign up to try them out for yourself.
                </p>
                <br />

                <p>When you sign up...</p>
                <ul
                className="list-disc sm:px-20 text-left">
                    <li 
                    className="p-4">
                        To keep the demo convenient, you are not required to use a strong password. Email addresses must be unique but do not need to be real.
                    </li>
                    <li 
                    className="p-4">
                        This demo account is not secure, so do not enter any sensitive information.
                    </li>
                    <li 
                    className="p-4">
                        Your demo account will be automatically deleted after two weeks.
                    </li>
                </ul>
                <br />

                <button>Take a Tour</button>

            </div>

            <div 
            className=" flex flex-col text-center place-content-center pt-8 w-full sm:w-1/2 sm:px-8">
                <LoginForm setUser={setUser}/>
                <SignUpForm setUser={setUser}/>
            </div>

        </main>
    )
}