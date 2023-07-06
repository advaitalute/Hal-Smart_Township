import React, { useEffect, useState } from "react";
import "../App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import { auth } from "../firebase";
import { actionTypes } from "../reducer";
import Loading from "./Loading";

function LogedIn(){
  console.log("Im loged in");

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
  console.log("into logedIn");
  return (
      <div className="app__body">
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/admin" exact>
              <Sidebar hide={false} />
              <Chat hide={true} removeRoom={removeRoom} />
              <div className="project__info">
                <img
                  src="https://stories.jobaaj.com/files/manage/thumb/641bf7335dd8e.jpg"
                  alt=""
                />
                <div className="text">
                  <h1>Resolver</h1>
                </div>
              </div>
            </Route>
            <Route path="/rooms/:roomId/:receiver">
              <Sidebar hide={true} />
              <Chat hide={false} removeRoom={removeRoom} />
            </Route>
          </Switch>
        </Router>
      </div>
  )
}

export default LogedIn;