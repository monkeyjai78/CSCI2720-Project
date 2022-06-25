//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  NavLink,
} from "react-router-dom";

import './style.css';
import Home from "./../Home";
import List from "./../List";
import FavList from "./../FavList";
import Info from "./../Info";
import User from "./../User";
import Place from "./../Place";
import Hours from "./../Hours";

function Layout() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  const loginout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  console.log(user)
  if (localStorage.getItem("user") === null){
    window.location.replace("/login")
  }
  return (
    <Router>
      <div className="hd">
        <nav>
          {user.role === "1" ? (
            <>
              <NavLink to="/index/home" exact activeClassName="active">
                Home
              </NavLink>
              <NavLink to="/index/list" exact activeClassName="active">
                Places List
              </NavLink>
              <NavLink to="/index/FavList" exact activeClassName="active">
                My Favourite List
              </NavLink>
              <NavLink to="/index/hours" exact activeClassName="active">
                Historical Data
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/index/user" exact activeClassName="active">
                Users List
              </NavLink>
              <NavLink to="/index/placeList" exact activeClassName="active">
                Place List
              </NavLink>
            </>
          )}
        </nav>
        <div>
          Welcome {user.role === 1 ? "Administrator ," : ""}
          {user.username},{" "}
          <span className="nav-logout" style={{ color: "blue" }} onClick={loginout}>
            <u>Logout</u>
          </span>
        </div>
      </div>
      <hr />
      <Switch>
        <Route exact path="/index/home" component={Home} />
        <Route exact path="/index/user" component={User} />
        <Route exact path="/index/placeList" component={Place} />
        <Route exact path="/index/hours" component={Hours} />
        <Route exact path="/index/list" component={List} />
        <Route exact path="/index/favlist" component={FavList} />
        <Route exact path="/index/info/:place_id?" component={Info} />
        <Redirect to={user.role === "1" ? "/index/home" : "/index/user"} />
      </Switch>
    </Router>
  );
}

export default Layout;
