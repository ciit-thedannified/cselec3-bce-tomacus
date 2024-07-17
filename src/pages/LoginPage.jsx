/**
 *  TODO:   Create the Login Page here.
 *          You may use any assets you see fit for this page component.
 */

import '../css/LoginPages.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';


export default function LoginPage() {

    const[email, setEmail] = useState ('');
    const[password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        console.log ('Email', email);
        console.log ('Password', password)
    };

    return (
    <div className='tomacus-container'>
        <h1>TOMACUS</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
         <div className='input-group'>
            <label>Email</label>
            <input type='email' value={email} onChange={(event) => setEmail(event.target.value)} required/>
            </div>

            <div className='input-group'>
                <label>Password</label>
                <input type='password' value={password} onChange={(event) => setPassword(event.target.value)} required/>  
            </div>
            <button type="submit">Login</button>
        </form>
        <p>
            Don't have an account? <Link to='/register'>Create one!</Link>
        </p>
    </div>
  );
    
}