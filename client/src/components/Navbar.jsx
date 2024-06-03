import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
   <nav class="navbar">
            <div class="logo"><a href="/"><img src="images/saavy-brand.png" alt="Saavy Brand Logo"></img></a></div>
            <ul class="menu">
                <a href="/"><li>Home</li></a>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div class="buttons">
                <a href="/login" id="log-1" type="button" value="Login" class="btn glass-btn">Login</a>
                <a href="/signup" id="reg-2" type="button" value="Signup" class="btn glass-btn">Sign Up</a>
            </div>
        </nav>
    </>
  );
};

export default AppNavbar;
