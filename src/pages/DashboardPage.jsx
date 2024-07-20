/**
 *  TODO:   Create and design the Dashboard page
 *          Requirements:
 *          a)  Navigation bar at the topmost part of project
 *          b)  Sidebar, containing all Pomodoro schedules of the user
 *          c)  Interface, displaying interactions in the app
 */
import {Link, Outlet, useNavigate} from "react-router-dom";
import '../css/DashboardPage.css'
import ScheduleCard from "../components/ScheduleCard";
import {UserAuth} from "../contexts/UserContext.jsx";
import {useEffect, useState} from "react";
import {collection, query, where, onSnapshot} from "firebase/firestore";
import {Database} from "../firebase/firebase.config.js";

import TomatoIcon from "../assets/tomato4.png";

export default function DashboardPage() {

    const {currentUser, username, logoutUser} = UserAuth();
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();

    async function handleAddSchedule(event) {
        event.preventDefault();

        navigate(`/dashboard/schedule/new`);
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

    useEffect(() => {
        if (!currentUser)
            navigate('/')
        else {
            const col = collection(Database, 'schedules');

            const q = query(col, where("owner", "==", currentUser.uid));

            onSnapshot(q, (snapshot) => {
                let res = []
                snapshot.forEach(doc => {
                    res.push({id: doc.id, el: <ScheduleCard ID={doc.id}/>});
                });
                setSchedules(res);
            })
        }
    }, [currentUser]);

    return (
        <div className="main container-fluid">
            <div className="row">
                <div className="col-12">
                    {/* [SECTION] Navigation bar */}
                    <div className="nav">
                        <img className="tomato-logo" src={TomatoIcon}></img>
                        <div className="logo"> TOMACUS</div>
                        <div className="menu">
                            <span><Link to="/dashboard">SCHEDULES</Link></span>
                            <span><Link to="/dashboard/profile">PROFILE</Link></span>
                            <span onClick={handleLogout}>LOGOUT, {username}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row content">
                <div className="col-4">
                    {/* [SECTION] Side bar */}
                    <div className="sidebar">
                        <div className="pomodoro-list">
                            <div className="pomodoro-header">
                                <span>Pomodoro List</span>
                                <button onClick={handleAddSchedule} className="add-btn">+</button>
                            </div>
                            {
                                schedules.map(
                                    scheduleObject => (
                                        <div key={scheduleObject.id} className="pomodoro-item">
                                            {scheduleObject.el}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="col-8">
                    {/* [SECTION] Interface, outlet */}
                    <Outlet/>
                </div>
            </div>
        </div>
    );
}