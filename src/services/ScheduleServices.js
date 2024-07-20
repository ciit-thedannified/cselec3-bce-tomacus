
import {Database} from '../firebase/firebase.config.js';
import {doc, collection, updateDoc, addDoc, deleteDoc} from "firebase/firestore";


const SCHEDULES = 'schedules'

async function addPomodoroSchedule(uid, data) {
    const col = collection(Database, SCHEDULES);

    return await addDoc(col, {owner: uid, ...data});
}

async function editPomodoroSchedule(id, data) {
    const targetDoc = doc(Database, SCHEDULES, id);

    return await updateDoc(targetDoc, data)
        .then( () =>
            console.log(`Updated schedule ${id}`));
}

async function deletePomodoroSchedule(id) {
    const targetSchedule = doc(Database, SCHEDULES, id);

    return await deleteDoc(targetSchedule);
}

export {
    addPomodoroSchedule,
    editPomodoroSchedule,
    deletePomodoroSchedule
}