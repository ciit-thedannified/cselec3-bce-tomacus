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

export default function ScheduleCard() {

    const card = useRef();
    const [showOptions, setShowOptions] = useState(false);
    const [name, setName] = useState('Schedule Title');
    const [workTime, setWorkTime] = useState('mm:ss');
    const [breakTime, setBreakTime] = useState('mm:ss');

    function handleCardClick(event) {
        // TODO: Implement handleCardClick
        event.stopPropagation();
        console.log(`Clicked on card: ${name}, Work time: ${workTime}, Break Time: ${breakTime}`);
        onCardClick({name, workTime, breakTime})

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
        onEdit({name, workTime, breakTime})
    }

    //When user clicks delete it will delete the users entry
    function handleDeleteClick(event){
        event.stopPropagation();
        setShowOptions(false);
        onDelete({name, workTime, breakTime})
    }

    // SUBJECT TO CHANGE
    useEffect(() => {
        // TODO: Implement useEffect hook.
        // Whenever there are possible changes in schedule data.
        console.log('Schedule data Changed:', {name, workTime, breakTime}); 
        
    }, [name, workTime, breakTime])

    return (
        <div ref={card} className="schedule-card" onClick={handleCardClick}>
            <div className="container">
                <div className="card-row">
                    {/* [SECTION] Schedule name */}
                    <div className="col">
                        <div className="schedule-title">
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
                        {workTime}
                    </div>
                    <div className="col break-time">
                        {breakTime}
                    </div>
                </div>
            </div>
        </div>
    );
}