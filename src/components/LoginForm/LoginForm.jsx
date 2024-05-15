import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate()

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
      navigate('/')

    } catch {
      setError("Could Not Log In. Please Try Again or Sign Up.");
    }
  }

  return (
    <div className="px-4">

      <h1 className="text-left font-bold">Log In</h1>

      <form autoComplete="off" onSubmit={handleSubmit} 
      className="" >

        <label 
        className="block sm:inline-block sm:text-right sm:w-1/5">
          Email
        </label>
        <input type="text" name="email" value={credentials.email} onChange={handleChange} required 
        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5"/>
        <br />

        <label 
        className="block sm:inline-block sm:text-right sm:w-1/5">
          Password
        </label>
        <input type="password" name="password" value={credentials.password} onChange={handleChange} required 
        className="border m-3 mt-1 sm:max-w-96 sm:w-3/5"/>
        <br />

        <button type="submit" className="mt-4" >LOG IN</button>

      </form>

      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
