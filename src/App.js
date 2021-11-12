import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyCircles from "./pages/MyCircles";
import MyDiscussions from "./pages/MyDiscussions";
import MyAnswers from "./pages/MyAnswers";
import AllPosts from "./pages/AllPosts";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyInbox from "./pages/MyInbox";
import Messages from "./pages/Messages";
import { Url } from "./constants/global";
import axios from "axios";

import Comments from "./pages/Comments";
function App() {
    const [userId, setUserId] = useState(localStorage.userId);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        if (userId) {
            axios
                .get(`${Url}/users/${userId}`)
                .then((res) => {
                    setCurrentUser(res.data[0]);
                    localStorage.setItem("name", res.data[0].name);
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                    //setPending(false);
                    console.log(error.config);
                });
        } else {
            setCurrentUser(null);
        }
    }, [userId]);

    return (
        <BrowserRouter>
            <div className="App">
                <Navbar currentUser={currentUser} onUpdate={setUserId} />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/login"
                        render={() => {
                            return <Login onUpdate={setUserId} />;
                        }}
                    />
                    <Route
                        exact
                        path="/register"
                        render={() => {
                            return <Register onUpdate={setUserId} />;
                        }}
                    />
                    <Route
                        exact
                        path="/user/:id"
                        render={(props) => {
                            return <Profile onUpdate={setUserId} {...props} />;
                        }}
                    />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/my-circles" component={MyCircles} />
                    <Route
                        exact
                        path="/my-circles/:id/all-posts"
                        component={AllPosts}
                    />
                    <Route
                        exact
                        path="/my-circles/:id/leaderboard"
                        component={Leaderboard}
                    />
                    <Route
                        exact
                        path="/my-circles/my-discussions"
                        component={MyDiscussions}
                    />
                    <Route
                        exact
                        path="/my-circles/my-answers"
                        component={MyAnswers}
                    />
                    <Route exact path="/my-inbox" component={MyInbox} />
                    <Route
                        exact
                        path="/my-inbox/messages/:id"
                        component={Messages}
                    />
                    <Route exact path="/circle/:id" />
                    <Route
                        exact
                        path="/my-circles/:circleId/:postId/comments"
                        component={Comments}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
