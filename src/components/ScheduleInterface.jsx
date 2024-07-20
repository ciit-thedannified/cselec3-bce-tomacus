import {useNavigate, useParams} from "react-router-dom";
import '../css/DashboardPage.css';
import {useEffect, useRef, useState} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {Database} from "../firebase/firebase.config.js";

export default function ScheduleInterface() {

    const {scheduleId} = useParams();

    const [name, setName] = useState('Schedule Name');
    const [uptime, setUptime] = useState(0);
    const [time, setTime] = useState(1500);// 25 mins in secs
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // work, shortbreak, longbreak

    const navigate = useNavigate();
    const timer = useRef();

    useEffect(() => {
        async function fetchData() {
            if (scheduleId !== null) {
                const q = doc(Database, 'schedules', scheduleId)

                await onSnapshot(q, docSnap => {
                    const data = docSnap.data();

                    setName(data.name);
                    setUptime(data.uptime);
                    setTime(data.uptime);
                    setIsRunning(false);
                    setMode('work');
                });
            }
        }

        fetchData()
    }, [scheduleId]);

    useEffect(() => {
        if (isRunning && time > 0) {
            timer.current = setInterval(() => {
                setTime(prevTime => prevTime - 1);
                console.log(time);
            }, 1000);
        } else if (time === 0) {
            //If the timer reaches 0, we will handle the end of session
            setIsRunning(false);
            alert('Time is up!');
        }
        return () => clearInterval(timer.current);
    }, [isRunning, time]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function handleStartPause() {
        setIsRunning(!isRunning);
    }

    function handleResetTimer() {
        setIsRunning(false);
        if (mode === 'work') {
            setTime(uptime);
        } else if (mode === 'shortBreak') {
            setTime(300); // 5 mins
        } else if (mode === 'longBreak') {
            setTime(1200); // 20 mins
        }
    }

    function handleChangeMode(newMode) {
        setMode(newMode);
        setIsRunning(false);
        if (newMode === 'work') {
            setTime(uptime);

        } else if (newMode === 'shortBreak') {
            setTime(300);

        } else if (newMode === 'longBreak') {
            setTime(1200);
        }
    }

    function handleEditSchedule(event) {
        event.preventDefault();

        navigate(`/dashboard/schedule/edit/${scheduleId}`);
    }

    return (
        <>
            <div className="interface">
                <h2> {name} </h2>
                <div className="buttons">
                    <button className="tomacus-btn" onClick={() => handleChangeMode('work')}>Work Time</button>
                    <button className="short-break-btn" onClick={() => handleChangeMode('shortBreak')}>Short Break
                    </button>
                    <button className="long-break-btn" onClick={() => handleChangeMode('longBreak')}>Long Break</button>
                </div>
                <div className="timer">
                    <div className="circle">
                        <span className="time">{formatTime(time)}</span>
                        <button className="start-pause-btn" onClick={handleStartPause}>
                            {isRunning ? 'Pause' : 'Start'}
                        </button>
                        <button className="reset-btn" onClick={handleResetTimer}>Reset</button>
                        <span className="settings" onClick={handleEditSchedule}>Settings</span>
                    </div>
                </div>
            </div>
        </>
    )
}