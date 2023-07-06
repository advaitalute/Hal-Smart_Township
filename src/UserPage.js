import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { auth, provider } from "./firebase";
import { actionTypes } from "./reducer";
import Loading from "./Components/Loading";

import { Button } from "@material-ui/core";
// import LogedIn from '../LogedIn'

import "./App.css";
import './Components/pages/page.css';
import LogedIn from "./Components/LogedIn";

export default function UserPage() {
    
    const [{ user }, dispatch] = useStateValue();
    const [loading, setLoading] = useState(true);

    useEffect(() => { 
        setLoading(true);
        const listener = auth.onAuthStateChanged((authUser) => {
        setLoading(false);
        if (authUser) {
            dispatch({
            type: actionTypes.SET_USER,
            user: authUser,
            });
        } else {
            dispatch({
            type: actionTypes.SET_USER,
            user: null,
            });
        }
        });
        return () => listener();
    }, [dispatch]);

    const removeRoom = (roomid) => {
        db.collection("Rooms")
        .doc(roomid)
        .delete()
        .then(() => {
            alert("Room Deleted");
        });
    };

    const signIn = () => {
        console.log("signIn");
        auth
            .signInWithPopup(provider)
            .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
            console.log("hello", result.user.displayName);
            const docref = db.collection("Users").doc(result.user.email);
            docref.set({
                email: result.user.email,
                name: result.user.displayName,
            });
            // we want email and his name and we store it in the database
            //localStorage.setItem("user", JSON.stringify(result.user));
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="app">
            {!user ? (
                <div className="login">
                    <div className="login__container">
                    <img src="https://stories.jobaaj.com/files/manage/thumb/641bf7335dd8e.jpg"  alt="" />
                        <div className="login__text">
                        <h1>Sign in to </h1>
                        <br />
                        <h1>HAL SMART TOWNSHIP</h1>
                        </div>
                        <Button onClick={signIn}>Sign In with Google</Button>
                        <footer style={homepagestyle}>
                            <p><Link to="/">Back to Homepage</Link>.</p>
                        </footer>
                    </div>
                </div>
                ) : (        
                <LogedIn />
            )}
        </div>
    )

}

const homepagestyle = {
    margin: 20,
}