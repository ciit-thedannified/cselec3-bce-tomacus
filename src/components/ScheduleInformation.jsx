import {useParams} from "react-router-dom";

export default function ScheduleInformation() {

    const { id } = useParams();

    return <div> {id} </div>

}