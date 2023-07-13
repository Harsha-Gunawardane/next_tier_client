import React from 'react';
import logo from './Assets/logo.png';
import './Styles/Footer.css';

function Footer() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (

        <div className='Footer'>
            <div>
                <img className='logo' src={logo} alt="NextTier Logo" />

                <div className="quickLinks">
                    <p><a onClick={() => scrollToSection('home')}> Home</a></p>
                    <p><a onClick={() => scrollToSection('about')} >About Us</a></p>
                    <p><a onClick={() => scrollToSection('services')} >Services</a></p>
                    <p><a onClick={() => scrollToSection('contact')}>  Contact Us</a></p>
                </div>
            </div>
            <div><p className='footer_text'>&copy;2023 NextTier. All rights reserved</p></div>
        </div>
    )
}

export default Footer
