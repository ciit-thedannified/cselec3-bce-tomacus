/**
 *  TODO:   Create and design the Dashboard page
 *          Requirements:
 *          a)  Navigation bar at the topmost part of project
 *          b)  Sidebar, containing all Pomodoro schedules of the user
 *          c)  Interface, displaying interactions in the app
 */
import {Outlet} from "react-router-dom";
import '../css/DashboardPage.css'

export default function DashboardPage() {
    return (
        <div className="main container-fluid">
            <div className="row">
                <div className="col-12">
                    {/* [SECTION] Navigation bar */}
                    <div className="nav">
                        <img className="tomato-logo" src="src/assets/tomato4.png"></img>
                        <div className="logo"> TOMACUS</div>
                        <div className="menu">
                            <span>SCHEDULES</span>
                            <span>PROFILE</span>
                            <span>HELLO, {`{USER}`}</span>
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
                                <button className="add-btn">+</button>
                            </div>
                            <div className="pomodoro-item">
                                <span>Schedule #1 cook a food 30:00</span> 
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-8">
                    {/* [SECTION] Interface, outlet */}
                        <Outlet />
                </div>
            </div>
        </div>
    );
}