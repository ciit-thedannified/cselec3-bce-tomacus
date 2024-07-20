/**
 *  TODO:   Create the Login Page here.
 *          You may use any assets you see fit for this page component.
 */

import '../css/LoginPages.css';
import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from "../services/AuthServices.js";
import {UserAuth} from "../contexts/UserContext.jsx";
import TomatoIcon from "../assets/tomato4.png";
import LeavesIcon from "../assets/leaves.png";

export default function LoginPage() {

    const navigate = useNavigate();

    const { currentUser } = UserAuth();

    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');


    async function handleLoginUser(event) {
        event.preventDefault();

        try {
            await loginUser(email, password)
                .then(() => {
                    navigate('/dashboard');
                })
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
    <div className="tomacus-body">
        <div className='tomacus-container'>
            <div className='image-container'>
                <img className='tomato-image' src={TomatoIcon}></img>
                <img className='leaves-image' src={LeavesIcon}></img>
            </div>
            <h1>TOMACUS</h1>
            <h2>Login</h2>
            <form onSubmit={handleLoginUser}>
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
    </div>
  );
    
}