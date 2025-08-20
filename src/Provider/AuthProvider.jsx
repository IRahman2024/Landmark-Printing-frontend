import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { auth } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [localUserInfo, setlocalUser] = useState([]);
    // const [role, setRole] = useState();
    const [loader, setLoader] = useState(true);
    const [role, setRole] = useState(true);
    // console.log(user);

    const axiosPublic = useAxiosPublic();

    const checkRole = async (email) => {
        const data = await axiosPublic.get(`/getRoles?email=${email}`);
        // console.log(data.data);
        setRole(data.data);
    }


    const googleProvider = new GoogleAuthProvider();

    const signInUser = (email, pass) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, pass)
            // .then(()=>{
            //     checkRole(email);
            //     console.log(role);
            // })
            .catch((error) => {
                console.error("Error signing in:", error.message);
                if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                    alert('Invalid Credentials');
                    setLoader(false);
                }
                throw error; // Re-throw the error for the caller to handle
            });
    }
    const createUser = (email, pass) => {
        setLoader(true);
        console.log(email, pass);

        return createUserWithEmailAndPassword(auth, email, pass)
            .then((res) => {
                // checkRole(email);
                return res;
            })
            .catch((error) => {
                console.error("Error Creating User:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    const logOut = () => {
        setLoader(true);
        return signOut(auth);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
            // .then((res)=>{
            //     checkRole(res.user.email);
            //     return res;
            // })
            .catch((error) => {
                console.error("Error signing in:", error.message);
                throw error; // Re-throw the error for the caller to handle
            });
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                // console.log(currentUser);

                const userInfo = { email: currentUser.email }
                axiosPublic.get(`/users/${currentUser.email}`)
                    .then((data) => setlocalUser(data.data))
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            // console.log(res.data.token);
                            setLoader(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoader(false);
            }
            if (currentUser?.email)
                checkRole(currentUser.email);
            setLoader(false);
        })

        return () => {
            unSubscribe();
            setLoader(false);
        }
    }, [user?.email]);

    const authInfo = {
        user,
        localUserInfo,
        loader,
        role,
        createUser,
        updateUserProfile,
        signInUser,
        logOut,
        googleSignIn,
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;