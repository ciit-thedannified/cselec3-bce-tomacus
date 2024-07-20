import {UserAuth} from "../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";
import {terminateUser} from "../services/AuthServices.js";
import {useEffect} from "react";


export default function ProfilePage() {

    const { currentUser, username, logoutUser } = UserAuth();

    const navigate = useNavigate();

    const divStyle = {
        margin: "20px 10px"
    }

    async function handleLogout(event) {
        event.preventDefault();

        try {
            await logoutUser()
                .then(() => {
                    navigate('/');
                });
        } catch (e) {
            console.error(e);
        }
    }

    async function handleTerminate(event) {
        event.preventDefault();

        const choice = confirm("Are you sure you want to terminate your account?");

        if (choice) {
            await terminateUser()
                .then(() => {
                    navigate('/');
                })
        }
    }

    return (
        <div className="tomacus-container" style={divStyle}>
            <h1> User Profile </h1>
            <form>
                <div className="input-group">
                    <label> Username: {username} </label>
                </div>
                <div className="input-group">
                    <label> E-mail: {currentUser === null ? "" : currentUser.email} </label>
                </div>
                <div className="input-group">
                    <button onClick={handleLogout}> LOG OUT</button>
                </div>
                <div className="input-group">
                    <button onClick={handleTerminate}> DELETE ACCOUNT </button>
                </div>
            </form>
        </div>
    )

}