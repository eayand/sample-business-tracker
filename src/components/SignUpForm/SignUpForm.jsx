import { Component } from "react";
import { signUp } from "../../utilities/users-service";

//class based ones accept props automatically, so we don't have to specifically pass down the setUser function, but we have to refer to it as this.props.setUser
export default class signUpForm extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
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
        } catch {
            this.setState({error: 'Signup failed. Try again.'})
        }
    };

    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
                <div className="form-container">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <label className="align-rt">First Name</label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
                        <label className="align-rt">Last Name</label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
                        <label className="align-rt">Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                        <label className="align-rt">Password</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                        <label className="align-rt">Confirm</label>
                        <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                        <div></div><button type="submit" disabled={disable}>SIGN UP</button>
                    </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
    }

}