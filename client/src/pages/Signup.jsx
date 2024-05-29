import React from 'react';

function Signup(props) {
    return (
<>
<section class="container">
    <input type="checkbox" id="signup_toggle" hidden/>
    <article class="form">
        <form id="form-signup" class="form_front">
            <h2 class="form_details">Sign up</h2>
            <input id="firstName" type="text" class="input" placeholder="First Name"/>
            <input id="lastName" type="text" class="input" placeholder="Last Name"/>
            <input id="signup-email" type="text" class="input" placeholder="Email"/>
            <input id="signup-password" type="password" class="input" placeholder="Password"/>
            <input id="phone" type="text" class="input" placeholder="Phone Number"/>
            <button id="register-btn" type="submit" class="btn">Register</button>
            <p class="switch">Have an account? <span class="signup_tog">Login</span></p>
        </form>
    </article>
</section>

</>
    );
}

export default Signup;