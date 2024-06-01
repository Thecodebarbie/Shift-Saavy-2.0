import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_USER_SCHEDULES } from '../utils/queries';


function CalloffForm(props) {
    return (
<>


<section class="container">
        <input type="checkbox" id="signup_toggle" hidden/>
        <article class="form"/>
            <form id="form-signup" class="form_front"/>
                <h2 class="form_details">Call Off Request</h2>
                <input name="firstname" type="text" class="input" placeholder="First Name"/>
                <input name="lastname" type="text" class="input" placeholder="Last Name"/>
                <input name="starttime" type="ttet" class="input" placeholder="Shift Date"/>
                <input name="endtime" type="text" class="input" placeholder="Shift Start Time"/>
                <input name="endtime" type="text" class="input" placeholder="Shift End Time"/>
                <button name="calloff-btn" type="submit" class="btn">Submit Call Off</button>
                
    </section>

    <section id="success-section" class="container">
        <input type="checkbox" id="calloff_toggle_success" hidden/>
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