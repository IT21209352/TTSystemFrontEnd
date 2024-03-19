import React, { useEffect, useState } from "react";
import "../src/styles/authScreens.css";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import axios  from "axios";
import {useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../src/store';

export default function SignIn() {
  const customStyle = { marginTop: "30px" };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const validateLoginInfo = () => {
    if (username.trim() === "")
      return { valid: false, error: "Email is required" };
    if (password.trim() === "")
      return { valid: false, error: "Password is required" };
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(username))
      return { valid: false, error: "Invalid email" };
    return { valid: true, error: "" };
  };


  const handleButtonClick = async () => {
    const valid = validateLoginInfo();
    if (valid) {
      try {
        const data = await sendRequest();
        dispatch(authActions.login()); 
        if (data.user.Type === "Student") {
          history("/stdDashboard"); 
        }else if(data.user.Type === "Admin"){
          history("/usermanagemnt"); 
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    }
  };


  const sendRequest = async () => {
    const res = await axios.post("http://localhost:5000/api/login", {
      Email: username,
      Password: password
    }).catch((err) => {
      throw new Error("Login request failed:", err);
    });
    return res.data;
  };


  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="content-card">
          <div className="side">
            <div className="form-container">
              <TextInput
                label="Email"
                type="email"
                placeholder="john@xyz.com"
                action={handleEmailChange}
              />
              <TextInput
                label="Password"
                type="password"
                placeholder="******"
                action={handlePasswordChange}
                error={error}
              />
             
              <Button
                text="LOGIN"
                customStyle={customStyle}
                action={handleButtonClick}
              />

        
            </div>
          </div>

          <div className="side image-side">
          <span style={{ marginTop:"10%"}} className="title">TimeTable Management System</span>
            <div className="image-side-content">
             
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
