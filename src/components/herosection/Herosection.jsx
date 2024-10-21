import React from 'react';
import './hero.css'; // Import your CSS file

function HeroSection() {
    return (
        <div className="relative w-full">
            <img 
                className="hero-image object-cover w-full " // Changed to object-cover
                src="https://www.themancompany.com/cdn/shop/files/Oud_Banner_Mobile_1500x.jpg?v=1727958571" 
                alt="Hero" 
            />
        </div>
    );
}

export default HeroSection;
