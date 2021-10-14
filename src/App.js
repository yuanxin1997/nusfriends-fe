import "./App.css";
import Navbar from "./components/Navbar";
import "react-router-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyCircles from "./pages/MyCircles";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/my-circles" component={MyCircles} />
                    <Route exact path="/circle/:id" />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
