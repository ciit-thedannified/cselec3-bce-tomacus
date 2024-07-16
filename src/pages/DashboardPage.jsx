/**
 *  TODO:   Create and design the Dashboard page
 *          Requirements:
 *          a)  Navigation bar at the topmost part of project
 *          b)  Sidebar, containing all Pomodoro schedules of the user
 *          c)  Interface, displaying interactions in the app
 */
import {Outlet} from "react-router-dom";

export default function DashboardPage() {
    return (
        <div className="main container-fluid">
            <div className="row">
                <div className="col">
                    {/* [SECTION] Navigation bar */}
                    <div className="nav">

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    {/* [SECTION] Side bar */}
                    <div className="sidebar">

                    </div>
                </div>
                <div className="col-8">
                    {/* [SECTION] Interface, outlet */}
                    <div className="interface">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}