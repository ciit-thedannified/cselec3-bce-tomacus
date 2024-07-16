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

export default function ScheduleCard() {

    const card = useRef();
    const [name, setName] = useState('Schedule Title');
    const [workTime, setWorkTime] = useState('mm:ss');
    const [breakTime, setBreakTime] = useState('mm:ss');

    function handleCardClick(event) {
        // TODO: Implement handleCardClick
        event.stopPropagation();

    }

    // SUBJECT TO CHANGE
    useEffect(() => {
        // TODO: Implement useEffect hook.
        // Whenever there are possible changes in schedule data.

    }, [name, workTime, breakTime])

    return (
        <div ref={card} className="schedule-card" onClick={handleCardClick}>
            <div className="container">
                <div className="row">
                    {/* [SECTION] Schedule name */}
                    <div className="col">
                        <div className="schedule-title">
                            {name}
                        </div>
                    </div>
                    {/* [SECTION] Options icon */}
                    <div className="col">
                        <img src={null}
                             alt="Options" />

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
    )
}