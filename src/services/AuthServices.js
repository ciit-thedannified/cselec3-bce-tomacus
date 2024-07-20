import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser} from "firebase/auth";
import {Auth} from "../firebase/firebase.config.js";

const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(Auth, email, password);
}

const loginUser = async (email, password) => {
    return signInWithEmailAndPassword(Auth, email, password);
}

const logoutUser = async () => {
    return signOut(Auth);
}

const terminateUser = async () => {
    return deleteUser(Auth.currentUser);
}

export {
    createUser,
    loginUser,
    logoutUser,
    terminateUser
}