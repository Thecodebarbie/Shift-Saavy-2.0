import React from 'react';

function CalloffForm(props) {
    return (
        <>


            <section class="container">
                <input type="checkbox" id="signup_toggle" hidden />
                <article class="form">
                    <form id="form-signup" class="form_front">
                        <h2 class="form_details">Call Off Request</h2>
                        <input id="firstName" type="text" class="input" placeholder="First Name" />
                        <input id="lastName" type="text" class="input" placeholder="Last Name" />
                        <input id="shift-date" type="password" class="input" placeholder="Date of Shift" />
                        <input id="starttime" type="text" class="input" placeholder="Shift Start Time" />
                        <input id="endtime" type="text" class="input" placeholder="Shift End Time" />
                        <button id="calloff-btn" type="submit" class="btn">Submit Call Off</button>
                        <p class="switch">Want to swap shifts? <span class="signup_tog">Shift Swap</span></p>
                    </form>
                </article>
            </section>

            <section id="success-section" class="container">
                <input type="checkbox" id="calloff_toggle_success" hidden />
                <article class="form">
                    <form id="form-success" class="form_front">
                        <h2 class="form_details">You have successfully called off</h2>
                    </form>
                </article>
            </section>
        </>
    );
}

export default CalloffForm;