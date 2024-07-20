import {
    createContext,
    useContext, useEffect, useState
} from "react";

import {
    onAuthStateChanged
} from 'firebase/auth'
import {Auth, Database} from "../firebase/firebase.config.js";
import {createUser, loginUser, logoutUser} from "../services/AuthServices.js";
import {doc, getDoc} from "firebase/firestore";

const UserContext = createContext();

export function UserProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(Auth, currentUser => {
            setCurrentUser(currentUser);
            if (currentUser) {
                getDoc(doc(Database, 'users', currentUser.uid))
                    .then(docSnap => {
                        if (docSnap.exists()) {
                            const data = docSnap.data();
                            setUsername(data.username);
                        }
                    })
            }
        })

        return unsubscribe;
    }, [])

    const values = {
        currentUser,
        username,
        createUser,
        loginUser,
        logoutUser
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
}

export function UserAuth() {
    return useContext(UserContext);
}