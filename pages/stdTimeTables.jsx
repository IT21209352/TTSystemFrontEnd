import Sidebar from '../components/Sidebar';
import Navi from '../components/Niv';
import axios  from "axios";
import {useNavigate } from 'react-router-dom';

import React, { useState ,useEffect ,Component } from "react";
import {Box,Button,Table,TextField} from "@mui/material"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function stdTimeTables() {
    const [user,setUser] = useState();
    const history = useNavigate();
    const [userCourses, setUserCourses] = useState([]);
    const [myClassSessions, setMyClassSessions] = useState([]);
      
    useEffect(() => {
        getUserData().then((data) => {
            console.log(data.user.Courses)
            getMyCourseData(data.user.Courses);
        });
    }, []);
    
    const getMyCourseData = async (courses) => {
        try {
            const res = await axios.get("http://localhost:5000/session/getmysessions", {
                params: { courses }, // Passing courses as query parameter
                withCredentials: true
            });
            const data = res.data;
            setMyClassSessions(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const getUserData = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/user", {
            withCredentials: true
          });
          const data = res.data;
        //  console.log(data);
          return data;
        } catch (error) {
          console.error("Error fetching user data:", error);
          history("../signIn");
          return null; 
        }
      };

    
  return (
    <div>
    <ToastContainer position="top-right" theme="colored" /> 
    <Navi name="Dashboard" />

    <div className="grid-container"> 

    <div><Sidebar/></div>


    <div>
    <Table border="1" style={{margin:"auto auto",padding:"50px",widows:"100%"}}>
            <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Faculty</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
            </thead>
            {/* <tbody>
            {myClassSessions.map((session,index)=> {
              return(                            
                <tr  key={index}> 
                    <td > {session.Course}</td>
                    <td > {session.Date}</td>
                    <td > {session.Faculty}</td>
                    <td > {session.Location} </td>
                    <td > {session.StartTime} </td>
                    <td > {session.EndTime} </td>
                </tr>    
              )})} 
            </tbody> */}
          </Table>
    </div>
    </div>
    </div>
    //safasf
  )
}

export default stdTimeTables