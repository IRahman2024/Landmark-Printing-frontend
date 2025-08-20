import React, { useContext, useEffect, useState } from "react";
import styles from "./SignUp_LogIn_Form.module.css";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { axiosSecure } from "../../Hooks/useAxiosPrivate";
import useAxiosPublic, { axiosPublic } from "../../Hooks/useAxiosPublic";
import { lineSpinner } from 'ldrs';

const SignUpLoginForm = () => {
    const [loader, setLoader] = useState(false);
    const [userList, setUserList] = useState([]);
    const [active, setActive] = useState(false);
    const [dropOptions, setDropOptions] = useState(null);
    const [error, setError] = useState(null);
    lineSpinner.register();

    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const navigate = useNavigate();

    // const roleDisplayMap = {
    //     Customer: "want to buy",
    //     Seller: "want to sell",
    // };

    useEffect(() => {
        axiosPublic.get('http://localhost:3000/allUsersEmail')
            .then(res => {
                // console.log(res.data);
                setUserList(res.data);
            })
    }, [])

    // console.log(userList);


    const auth = getAuth();

    const { googleSignIn, user, signInUser, loader: userLoader, createUser, updateUserProfile } = useContext(AuthContext);

    const handleGoogleAuth = () => {
        setLoader(true);
        googleSignIn()
            .then(result => {
                // console.log(result.user);

                if (!userList.includes(result.user.email)) {
                    // console.log('hit! new user');

                    const data = {
                        userName: result.user.displayName,
                        email: result.user.email,
                        role: 'Seller',
                        profilePic: (result.user?.photoURL || null),
                    }
                    axiosPublic.post('http://localhost:3000/addUser', data)
                        .then(res => {
                            // console.log(res);
                            setLoader(false);
                            navigate(location?.state ? location.state : '/');
                        })
                }
                setLoader(false);
                console.log(location?.state);

                navigate(location?.state ? location.state : '/');
            })
    }

    const handleLogSubmit = (e) => {
        setLoader(true);
        e.preventDefault();
        // Handle form submission
        const loginEmail = document.querySelector('input[name="login-email"]')?.value;
        const pass = document.querySelector('input[name="password"]')?.value;

        signInUser(loginEmail, pass)
            .then(res => console.log(res))
            .then(() => setLoader(false))
            .then(() => navigate(location?.state ? location.state : '/'))

        console.log(loginEmail, pass);

    };

    // console.log(location.state);
    

    const handleRegSubmit = (e) => {
        e.preventDefault();
        // Handle form submission

        const regUserName = document.querySelector('input[name="reg-userName"]')?.value;
        const regEmail = document.querySelector('input[name="reg-email"]')?.value;
        const regPassword = document.querySelector('input[name="reg-password"]')?.value;
        // const role = dropOptions;
        // if (!role)
        //     setError('Please choose your account type');
        // if (role)
        //     setError(null);

        console.log(regUserName, regEmail, regPassword);

        createUser(regEmail, regPassword)
            .then(result => {
                // console.log('clicked');
                // console.log(result);

                // // Wait until the current user is available
                if (auth.currentUser) {
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            alert("Check email for verification.");
                        })
                        .catch((err) => console.error("Error sending verification email:", err));
                } else {
                    console.error("auth.currentUser is null");
                }

                // Optional backend registration or profile update logic
                const info = {
                    userName: regUserName,
                    email: regEmail,
                };

                console.log(info);

                axiosSecure.post('/addUser', info)
                    .then(res => console.log(res))
                    .catch(err => console.error('Error saving user info:', err));        
            })
            .catch(error => {
                if (error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).')
                    alert('Email already exists! Try something different!');
            });

        // setLoader(false);

    };

    if(user)
        navigate(location?.state || '/')

    if (loader) {
        return (
            <div className="flex size-full items-center justify-center bg-blue-300 opacity-65 fixed z-20">
                <p className="text-3xl font-black">Logging in. Please wait...</p>
                <div className="">
                    <l-line-spinner
                        size="181"
                        stroke="10"
                        speed="1"
                        color="black"
                    ></l-line-spinner>
                </div>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center">
            <Helmet>
                {/* Poppins font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
                    rel="stylesheet"
                />
                {/* Boxicons */}
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
            </Helmet>
            <div className={`${styles.container}${active ? " " + styles.active : ""}`}>
                {/* Login form */}
                <div className={styles["form-box"] + " " + styles.login}>
                    <form onSubmit={handleLogSubmit}>
                        <h1>Login</h1>
                        <div className={styles["input-box"]}>
                            <input name='login-email' type="email" placeholder="You Email" required />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className={styles["input-box"]}>
                            <input name='password' type="password" placeholder="Password" required />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        <div className={styles["forgot-link"]}>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" className={styles.btn}>Login</button>
                        <p>or login with</p>
                        <div className={styles["social-icons"]}>
                            <a onClick={() => handleGoogleAuth()} href="#"><i className="bx bxl-google"></i></a>
                        </div>
                    </form>
                </div>
                {/* Registrtion form */}
                <div className={styles["form-box"] + " " + styles.register}>
                    <form onSubmit={handleRegSubmit}>
                        <h1>Registration</h1>
                        <div className={styles["input-box"]}>
                            <input name='reg-userName' type="text" placeholder="Username" required />
                            <i className="bx bxs-user"></i>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                name='reg-email'
                                type="email" placeholder="Email" required />
                            <i className="bx bxs-envelope"></i>
                        </div>
                        <div className={styles["input-box"]}>
                            <input
                                name='reg-password'
                                type="password" placeholder="Password" required />
                            <i className="bx bxs-lock-alt"></i>
                        </div>
                        <button type="submit" className={styles.btn}>Register</button>
                        {error && <p className="text-xl font-bold text-red-500">{error}</p>}
                    </form>
                </div>
                {/* after form */}
                <div className={styles["toggle-box"]}>
                    <div className={styles["toggle-panel"] + " " + styles["toggle-left"]}>
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button
                            type="button"
                            className={styles.btn + " " + styles["register-btn"]}
                            onClick={() => setActive(true)}
                        >
                            Register
                        </button>
                    </div>
                    <div className={styles["toggle-panel"] + " " + styles["toggle-right"]}>
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button
                            type="button"
                            className={styles.btn + " " + styles["login-btn"]}
                            onClick={() => setActive(false)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpLoginForm;
