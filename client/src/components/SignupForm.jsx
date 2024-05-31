import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const SignupForm = () => {
  // set initial form state
  const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
  const [addUser, { error: signupError }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupFormState({
      ...signupFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...signupFormState },
      });
      Auth.login(data.addUser.token);
      // Redirect user to dashboard page after successful signup
      //window.location.href = '/dashboard';
    } catch (e) {
      console.error(e);
    }

    // Clear the form state after submission
    setSignupFormState({
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <>
      <section className="container">
        <input type="checkbox" id="signup_toggle" hidden />
        <article className="form">
          <form id="form-signup" className="form_front" onSubmit={handleFormSubmit}>
            <h2 className="form_details">Sign up</h2>
            <input
              name="firstname"
              type="text"
              className="input"
              placeholder="Firstname"
              value={signupFormState.firstname}
              onChange={handleInputChange}
            />
            <input
              name="lastname"
              type="text"
              className="input"
              placeholder="Lastname"
              value={signupFormState.lastname}
              onChange={handleInputChange}
            />
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Username"
              value={signupFormState.username}
              onChange={handleInputChange}
            />
            <input
              name="email"
              type="text"
              className="input"
              placeholder="Email"
              value={signupFormState.email}
              onChange={handleInputChange}
            />
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              value={signupFormState.password}
              onChange={handleInputChange}
            />
            {signupError && <div>Sign up failed</div>}
            <button id="register-btn" type="submit" className="btn">Register</button>
            <p className="switch">Have an account? <span className="signup_tog">Login</span></p>
          </form>
        </article>
      </section>
    </>
  );
};

export default SignupForm;
