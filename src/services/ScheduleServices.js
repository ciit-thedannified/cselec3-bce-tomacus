
import {Database} from '../firebase/firebase.config.js';
import {doc, collection, updateDoc, addDoc, deleteDoc} from "firebase/firestore";


const SCHEDULES = 'schedules'

async function addPomodoroSchedule(uid, data) {
    const col = collection(Database, SCHEDULES);

    const doc = await addDoc(col, {owner: uid, ...data});

    console.log(`New schedule added: ${doc.id}`);
}

async function editPomodoroSchedule(id, data) {
    const targetDoc = doc(Database, SCHEDULES, id);

    await updateDoc(targetDoc, data)
        .then( () =>
            console.log(`Updated schedule ${id}`));
}

async function deletePomodoroSchedule(id) {
    const targetSchedule = doc(Database, SCHEDULES, id);

    await deleteDoc(targetSchedule);
}

export {
    addPomodoroSchedule,
    editPomodoroSchedule,
    deletePomodoroSchedule
}