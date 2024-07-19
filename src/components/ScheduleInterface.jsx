import {useParams} from "react-router-dom";
import '../css/DashboardPage.css';

export default function ScheduleInterface() {

    const { id } = useParams();

    return (
        <>
        <div className="interface">
            <div className="buttons">
                <button className="tomacus-btn">TOMACUS</button>
                <button className="short-break-btn">Short Break</button>
                <button className="long-break-btn">Long Break</button>
            </div>
            <div className="timer">
                <div className="circle">
                    <span className="time">25:00</span>
                    <span className="settings">Settings</span>
                </div>
            </div>
        </div>
        </>
    )
}