import React from 'react';

import Auth from '../utils/auth';

function Sidebar(props) {
    const handleLogout = (event) => {
            event.preventDefault();
            Auth.logout();
          
      };
    

    return (
<>
<aside class="sidebar">
        <figure class="logo">
            <img src="/images/saavy-brand-2.ico" alt="logo"/>
            <h3>ShiftSaavy</h3>
        </figure>
        <ul class="links">
            <li>
                <h4>Main Menu</h4>
            </li>
            <li>
                <span class="material-symbols-outlined">grid_view</span>
                <a href="/dashboard">Dashboard</a>
            </li>
            <li>
                <span class="material-symbols-outlined">calendar_month</span>
                <a href="/schedule">Schedule</a>
            </li>
            <li>
                <span class="material-symbols-outlined">swap_horiz</span>
                <a href="#">Shift Swap</a>
            </li>
            <hr/>
            <h4>Insights</h4>
            <li>
                <span class="material-symbols-outlined">notifications</span>
                <a href="/notifications">Notifications</a>
            </li>
            <li>
                <span class="material-symbols-outlined">mail</span>
                <a href="#">Inbox </a>
            </li>

            <li class="logout-link" onClick={handleLogout}>

                <span class="material-symbols-outlined">logout</span>
                <a href="#">Logout</a>
            </li>
        </ul>

    </aside>
</>
    );
}

export default Sidebar;