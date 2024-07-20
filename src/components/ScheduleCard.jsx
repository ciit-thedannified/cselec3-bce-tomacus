/**
 *  TODO:   Create a ScheduleCard
 *          - this component displays a preview information of a Pomodoro schedule.
 *            It must contain the following parts:
 *            a)    Schedule name (small heading)
 *            b)    Work time
 *            c)    Break time
 *            d)    Options button ('kebab' icon, aligned to 'Schedule Name')*
 *          - Its body must be clickable to display a dynamic content to dashboard's interface.
 */
import {useEffect, useRef, useState} from "react";
import {FaEllipsisV} from 'react-icons/fa';
import '../css/ScheduleCard.css';
import {useLocation, useNavigate} from "react-router-dom";
import {doc, onSnapshot} from "firebase/firestore";
import {Database} from "../firebase/firebase.config.js";
import {deletePomodoroSchedule} from "../services/ScheduleServices.js";

export default function ScheduleCard({ID = 'id'}) {

    const card = useRef();
    const [id, setId] = useState(ID);
    const [showOptions, setShowOptions] = useState(false);
    const [name, setName] = useState('Schedule Title');
    const [description, setDescription] = useState('Schedule Description');

    const navigate = useNavigate();
    const location = useLocation();

    function handleCardClick(event) {
        // TODO: Implement handleCardClick
        event.stopPropagation();
        console.log(`Clicked on card: ${name}`);
        navigate(`/dashboard/schedule/${id}`);
    }

    //When user clicks the kebab icon it will show the edit and delete 
    function handleKebabClick(event){
        event.stopPropagation();
        setShowOptions(!showOptions)
    }

    //When user clicks edit they can edit their entry from the schedule card
    function handleEditClick(event){
        event.stopPropagation();
        setShowOptions(false);
        navigate(`/dashboard/schedule/edit/${id}`);
    }

    //When user clicks delete it will delete the users entry
    async function handleDeleteClick(event){
        event.stopPropagation();
        setShowOptions(false);
        await deletePomodoroSchedule(id)
            .then(() => {
                if (location.pathname === `/dashboard/schedule/${id}`) navigate('/dashboard/');
            });
    }

    // SUBJECT TO CHANGE
    useEffect( () => {
        // TODO: Implement useEffect hook.
        // Whenever there are possible changes in schedule data.

        async function fetchData() {
            if (ID !== 'id' || ID === null) {
                const q = doc(Database, 'schedules', id)

                await onSnapshot(q, docSnap => {
                    const data = docSnap.data();

                    setName(data.name);
                    setDescription(data.description)
                });
            }
        }

        fetchData();
    }, [])

    return (
        <div ref={card} className="schedule-card" onClick={handleCardClick}>
            <div className="container">
                <div className="card-row">
                    {/* [SECTION] Schedule name */}
                    <div className="col">
                        <div className="schedule-title" onClick={handleCardClick}>
                            {name}
                        </div>
                    </div>
                    {/* [SECTION] Options icon */}
                    <div className="col kebab-col">
                       <FaEllipsisV className="kebab-icon" onClick={handleKebabClick}/>
                       {showOptions && (
                        <div className="kebab-menu">
                            <div className="kebabed" onClick={handleEditClick}>Edit</div>
                            <div className="kebabed" onClick={handleDeleteClick}>Delete</div>
                        </div>
                       )}
                        {/* Create a list of available options here; an overlay */}
                    </div>
                </div>
                <div className="row">
                    <div className="col work-time">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}