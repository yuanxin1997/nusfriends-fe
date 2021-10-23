import "./App.css";
import Navbar from "./components/Navbar";
import "react-router-dom";
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
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/user" component={Profile} />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/my-circles" component={MyCircles} />
                    <Route exact path="/my-circles/:id/all-posts" component={AllPosts} />
                    <Route exact path="/my-circles/:id/leaderboard" component={Leaderboard} />
                    <Route exact path="/my-circles/my-discussions" component={MyDiscussions} />
                    <Route exact path="/my-circles/my-answers" component={MyAnswers} />
                    <Route exact path="/my-inbox" component={MyInbox} />
                    <Route exact path="/my-inbox/messages" component={Messages} />
                    <Route exact path="/circle/:id" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
