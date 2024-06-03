import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [Login] = useMutation(LOGIN);
    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'login-email') {
            setLoginEmail(value);
        } else if (name === 'login-password') {
            setLoginPassword(value);
        }
        console.log(value)
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await Login({ variables: { email: loginEmail, password: loginPassword } });
            const token = data.login.token;
            console.log("Token: "+token)
            Auth.login(token);
            
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('Failed to login. Please check your email and password.');
        }
    };

    return (
        <>
        
            <section id="login-container" className="container">
                <input type="checkbox" id="signup_toggle" hidden />
                <article className="form">
                    <form id="form-login" className="form_front" onSubmit={handleLoginSubmit}>
                        <h2 className="form_details">Login</h2>
                        <input
                            name="login-email"
                            type="email"
                            className="input"
                            placeholder="Email"
                            value={loginEmail}
                            onChange={handleInputChange}
                            required
                        />
                        <span id="login-email-error" className="error-message"></span>
                        <input
                            name="login-password"
                            type="password"
                            className="input"
                            placeholder="Password"
                            value={loginPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <span id="login-password-error" className="error-message"></span>
                        {loginError && <span className="error-message">{loginError}</span>}
                        <button id="login-btn" type="submit" className="btn">Login</button>
                        <p className="switch">Don't have an account? <a><span className="signup_tog">Sign Up</span></a></p>
                    </form>

                    <form id="form-signup" className="form_back">
                        <h2 className="form_details">Sign up</h2>
                        <input id="firstName" type="text" className="input" placeholder="First Name" />
                        <input id="lastName" type="text" className="input" placeholder="Last Name" />
                        <input id="signup-email" type="text" className="input" placeholder="Email" />
                        <input id="signup-password" type="password" className="input" placeholder="Password" />
                        <input id="phone" type="text" className="input" placeholder="Phone Number" />
                        <button type="submit" className="btn">Register</button>
                        <p className="switch">Have an account? <span className="signup_tog">Login</span></p>
                    </form>
                </article>
            </section>

            <div id="loader" className="spinner">
                <div className="spinner1"></div>
            </div>
        </>
    );
}

export default Login;
