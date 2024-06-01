import React from 'react';

function Landing(props) {
    return (
<>

<section class="text-content landing-body">
            <h1>ShiftSaavy</h1>
            <h2>Your Ultimate Schedule Management App</h2>
            <h3>Stay Ahead with Real-Time Schedule Updates</h3>
            <p>Never miss a beat with ShiftSaavy! Our innovative app ensures you're always in the loop with your work schedule, providing real-time updates and changes.</p>
        </section>
        <form class="auth-buttons">
            <a href="/login" id="log-2"type="button" value="Login" class="btn glass-btn login-btn">Login</a>
           
        </form>
        

</>
    );
}

export default Landing;