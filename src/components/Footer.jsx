import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="bg-dark-blue text-white pt-5 pb-3 mt-auto">
            <div className="container">
                <div className="row">

                    {/* Quick Navigation Links */}
                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled quick-links">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/vehicles" className="text-white text-decoration-none">Our Fleet</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none">Login</Link></li>
                            <li><Link to="/signup" className="text-white text-decoration-none">Sign Up</Link></li>
                        </ul>
                    </div>

                    {/* About Company */}
                    <div className="col-md-4 mb-4">
                        <h5>About RoadReady</h5>
                        <p className="text-light-gray">
                            RoadReady is your premium vehicle rental service. We offer top-notch cars, SUVs, and luxury vehicles for your everyday needs or special occasions. Drive with confidence, drive RoadReady.
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="col-md-4 mb-4">
                        <h5>Connect With Us</h5>
                        <div className="d-flex gap-2">
                            <Button icon="pi pi-facebook" rounded text aria-label="Facebook" className="text-white social-btn" />
                            <Button icon="pi pi-twitter" rounded text aria-label="Twitter" className="text-white social-btn" />
                            <Button icon="pi pi-instagram" rounded text aria-label="Instagram" className="text-white social-btn" />
                            <Button icon="pi pi-linkedin" rounded text aria-label="LinkedIn" className="text-white social-btn" />
                        </div>
                    </div>
                </div>
                <hr className="bg-secondary" />
                <div className="row mt-3">
                    <div className="col text-center">
                        <p className="mb-0 text-light-gray">&copy; {new Date().getFullYear()} RoadReady. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
