import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { redirect } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

//class based ones accept props automatically, so we don't have to specifically pass down the setUser function, but we have to refer to it as this.props.setUser
export default class signUpForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
        role: 'admin',
        error: '',
    }
    // The object passed to setState is merged with the current state object
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };
    
    handleSubmit = async (evt) => {
        // const navigate = useNavigate()
        evt.preventDefault()
        // alert(JSON.stringify(this.state))
        try {
            const formData = {...this.state}
            delete formData.error
            delete formData.confirm
        // The promise returned by the signUp service method 
        // will resolve to the user object included in the
        // payload of the JSON Web Token (JWT)
            const user = await signUp(formData)
            this.props.setUser(user)
            // navigate('/')
        } catch {
            this.setState({error: 'Signup failed. Try again.'})
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div className="bg-lightblue sm:bg-white px-4 py-8">
                <div >

                    <h1 className="text-left font-bold">Sign Up</h1>

                    <form autoComplete="off" onSubmit={this.handleSubmit} className="">

                        <label 
                        className="block sm:inline-block sm:text-right sm:w-1/5">
                            First Name
                        </label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required 
                        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5" />
                        <br />

                        <label 
                        className="block sm:inline-block sm:text-right sm:w-1/5">
                            Last Name
                        </label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required 
                        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5" />
                        <br />

                        <label 
                        className="block sm:inline-block sm:text-right sm:w-1/5">
                            Email
                        </label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required 
                        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5" />
                        <br />

                        <label 
                        className="block sm:inline-block sm:text-right sm:w-1/5">
                            Password
                        </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required 
                        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5" />
                        <br />

                        <label 
                        className="block sm:inline-block sm:text-right sm:w-1/5">
                            Confirm Password
                        </label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required 
                        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5" />
                        <br />

                        <button type="submit" disabled={disable}
                        className="mt-4" >
                            SIGN UP
                        </button>

                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }

}