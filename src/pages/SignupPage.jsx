/**
 *  TODO:   Create the Sign Up Page here.
 *          You may use any assets you see fit for this page component.
 */

import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../css/Register.css';
import {UserAuth} from "../contexts/UserContext.jsx";
import {doc, setDoc} from "firebase/firestore"
import {Database} from "../firebase/firebase.config.js";

export default function SignupPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { currentUser, createUser } = UserAuth();
    const navigate = useNavigate();

    async function handleRegisterUser(event) {
        event.preventDefault();

        try {
            await createUser(email, password)
                .then(async userCredential => {
                    const user = userCredential.user;

                    await setDoc(doc(Database, 'users', user.uid), {
                        username: username,
                        email: email
                    })
                        .then( () => {
                            navigate('/dashboard');
                            console.log(`User '${username}' has been successfully registered.`);
                        })
                });
        }
        catch (e) {
            console.error(e);
        }

    }

    useEffect(() => {
        if (currentUser)
            navigate('/dashboard')
    }, [currentUser]);

    return (
        <div className="register-container">
        <div className='image-container'>
            <img className='tomato-image-reg' src='src/assets/tomato4.png'></img>
            <img className='leaves-image-reg' src='src/assets/leaves.png'></img>
        </div>
        <h1>TOMACUS</h1>
        <h2>Registration</h2>
        <form onSubmit={handleRegisterUser}>
            <div className="input-container">
                <label>Email</label>
                <input type="email" id="email" name="email"
                       onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="input-container">
                <label>Username</label>
                <input type="text" id="username" name="username"
                       onChange={e => setUsername(e.target.value)} required/>
            </div>
            <div className="input-container">
                <label>Password</label>
                <input type="password" id="password" name="password"
                       onChange={e => setPassword(e.target.value)} required/>
            </div>
            <button type="submit">Register</button>
        </form>
        <p>
            Already have an account? <Link to='/login'>Login</Link>
        </p>
    
    </div>
    );
}