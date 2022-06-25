//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)  Tsai Kwun Ki      (1155126289)

import React, { Component } from "react";
import { _login } from "./../../util/req.js";
import { withRouter } from "react-router-dom";
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "a123",
      password: "123456",
      login: "No",
    };
  }

  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  loginHandle = async () => {
    const obj = {
      username: this.state.username,
      password: this.state.password,
    };
    console.log("obj -> :", obj);

    const res = await _login(obj);
    if(res.code===500){
      alert("Username or password error");
      return;
    }
    this.successHandle(res.data);
    console.log(res);
  };

  successHandle = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    this.props.history.push(data.role === "1" ? "/index/home" : "/index/user");
  };
  render() {
    return (
      <div className="loginpage-container">
        <div className="loginpage-box">
          <div className="loginpage-title">
            Hospital Waiting Time Checking and Reviewing Platform
          </div>
					<div className="loginpage-usernametextbox">
						<div>
						username ：
						</div>
						<input
							value={this.state.username}
							onChange={(e) => this.handleChange(e, "username")}
						/>
					</div>
          <div className="loginpage-passwordtextbox">
						<div>
						password ：
						</div>
						<input type="password" 
							value={this.state.password}
							onChange={(e) => this.handleChange(e, "password")}
						/>
            </div>
          <button className="button button1" onClick={this.loginHandle}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
