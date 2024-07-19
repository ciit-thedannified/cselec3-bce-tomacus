import {useParams} from "react-router-dom";
import '../css/DashboardPage.css';
import { useEffect, useState } from "react";

export default function ScheduleInterface() {

    const { id } = useParams();

    const [time, setTime] = useState(1500);// 25 mins in secs
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // work, shortbreak, longbreak

    useEffect(()=>{
        let timer;
        if(isRunning && time > 0) {
            timer = setInterval(() =>{
                setTime(prevTime => prevTime -1);
            }, 1000);
        }else if(time === 0){
            //If the timer reaches 0, we will handle the end of session
            setIsRunning(false);
            alert('Time is up!');
        }
        return () => clearInterval(timer);
        }, [isRunning, time]);

        function formatTime(seconds){
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''} ${secs}`;
        }

        function handleStartPause(){
            setIsRunning(!isRunning);
        }
    
        function handleResetTimer(){
            setIsRunning(false);
            if(mode === 'work'){
                setTime(1500); // 25 mins
            }else if(mode === 'shortBreak'){
                setTime(300); // 5 mins
            }else if (mode === 'longBreak'){
                setTime(1200); // 20 mins
           }
        }

        function handleChangeMode(newMode){
            setMode(newMode);
            setIsRunning(false);
            if(newMode === 'work'){
                setTime(1500);

            }else if (newMode === 'shortBreak'){
                setTime(300);

            }else if (newMode === 'longBreak'){
                setTime(1200);
            }
        }
    
    
    return (
        <>
        <div className="interface">
            <div className="buttons">
                <button className="tomacus-btn" onClick={() => handleChangeMode('work')}>TOMACUS</button>
                <button className="short-break-btn" onClick={() => handleChangeMode('shortBreak')}>Short Break</button>
                <button className="long-break-btn" onClick={() => handleChangeMode('longBreak')}>Long Break</button>
            </div>
            <div className="timer">
                <div className="circle">
                    <span className="time">{formatTime(time)}</span>
                    <button className="start-pause-btn" onClick={handleStartPause}>
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button className="reset-btn" onClick={handleResetTimer}>Reset</button>
                    <span className="settings">Settings</span>
                </div>
            </div>
        </div>
        </>
    )
}