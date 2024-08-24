import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; 2024 Report Buddy - All Rights Reserved | 
          <a href="#about" className="text-blue-400 hover:text-blue-300 transition-colors mx-2">About Us</a> | 
          <a href="#services" className="text-blue-400 hover:text-blue-300 transition-colors mx-2">Services</a> | 
          <a href="#blog" className="text-blue-400 hover:text-blue-300 transition-colors mx-2">Blog</a> | 
          <a href="#contact" className="text-blue-400 hover:text-blue-300 transition-colors mx-2">Contact Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
