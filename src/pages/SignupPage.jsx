/**
 *  TODO:   Create the Sign Up Page here.
 *          You may use any assets you see fit for this page component.
 */

import React from "react";
import {Link} from 'react-router-dom';
import '../css/Register.css';

export default function SignupPage() {
    return (
        <div className="register-container">
        <h1>TOMACUS</h1>
        <h2>Registration</h2>
        <form>
            <div className="input-container">
                <label>Email</label>
                <input type="email" id="email" name="email" required/>
            </div>
            <div className="input-container">
                <label>Username</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="input-container">
                <label>Password</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <div className="input-container">
                <label>Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password" required/>
            </div>
            <button type="submit">Register</button>
        </form>
        <p>
            Already have an account? <Link to='/login'>Login</Link>
        </p>
    
    </div>
    );
}