import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import '../css/LoginPages.css';
import {doc, onSnapshot} from "firebase/firestore";
import {Database} from "../firebase/firebase.config.js";
import {addPomodoroSchedule, editPomodoroSchedule} from "../services/ScheduleServices.js";
import {UserAuth} from "../contexts/UserContext.jsx";

export default function ScheduleSettings({editMode}) {

    const { scheduleId } = useParams();

    const { currentUser } = UserAuth();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [uptime, setUptime] = useState(0);

    const navigate = useNavigate();

    async function handleEditSchedule(event) {
        event.preventDefault();

        const data = {
            name, description, uptime: uptime * 60
        }

        await editPomodoroSchedule(scheduleId, data)
            .then(() => {
                navigate(`/dashboard/schedule/${scheduleId}`);
            })
    }

    async function handleCreateSchedule(event) {
        event.preventDefault();

        const data = {
            name, description, uptime: uptime * 60
        }

        await addPomodoroSchedule(currentUser.uid, data)
            .then(() => {
                navigate(`/dashboard/schedule/${scheduleId}`);
            })
    }

    const divStyle = {
        margin: "20px 10px"
    }

    useEffect(() => {
        async function fetchData() {
            if (scheduleId !== null && editMode) {
                const q = doc(Database, 'schedules', scheduleId)

                await onSnapshot(q, docSnap => {
                    const data = docSnap.data();

                    setName(data.name);
                    setDescription(data.description)
                    setUptime(data.uptime / 60);
                });
            }
        }

        if (editMode) fetchData();
    }, []);

    return (
        <div className="tomacus-container" style={divStyle}>
            <h1> Schedule Settings </h1>
            <form onSubmit={editMode ? handleEditSchedule : handleCreateSchedule}>
                <div className='input-group'>
                    <label> Name </label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} required/>
                </div>
                <div className='input-group'>
                    <label> Description </label>
                    <input type='text' value={description} onChange={e => setDescription(e.target.value)} required/>
                </div>
                <div className='input-group'>
                    <label> Uptime (in minutes) </label>
                    <input type='number' min='1' max='60' step='1' value={uptime} onChange={e => setUptime(e.target.value)} required/>
                </div>
                <button type="submit"> {editMode ? "Edit" : "Create"} </button>
            </form>
        </div>
    )

}