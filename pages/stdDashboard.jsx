
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



axios.defaults.withCredentials = true

function dashboard() {
  const [user,setUser] = useState();
  const history = useNavigate();
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);


  const getUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/user", {
        withCredentials: true
      });
      const data = res.data;
     // console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      history("../signIn");
      return null; 
    }
  };

  const enrollCourse = (course) => {
    // Check if the course is already enrolled
    if (!userCourses.find((c) => c._id === course._id)) {
      setUserCourses((existingCourses) => [...existingCourses, course]);
    } else {
      // Course is already enrolled, show a message or handle it accordingly
      toast.error("Course is already enrolled");
    }
  };

const unenrollCourse = (course) => {
  setUserCourses((existingCourses) =>
    existingCourses.filter((c) => c._id !== course._id)
  );
};

const updateCourse = () =>{
  axios.put(`http://localhost:5000/api/updateusercourses/${user._id}`, userCourses)
  .then(() => {
    toast.success("User Updated");
    window.location.reload();
  })
  .catch((err) => {
    console.log(err);
  });
}

  useEffect(() => {
    function getCourseData() {
      axios.get("http://localhost:5000/course/getcoursedata").then((res) => {
     //   console.log(res.data)
        setCourses(res.data)
      });
    }
    getCourseData()
  }, []);

  
  useEffect(()=>{
    getUserData().then((data)=>{
      setUser(data.user),
      console.log(data.user.Courses)
      setUserCourses(data.user.Courses)
    })
  },[])

  if(!user) {
    return 
  }else
  {
  return (
    <div>
      <ToastContainer position="top-right" theme="colored" /> 
      <Navi name="Dashboard" customString= {user.Email} />
      <div className="grid-container"> 

      <div><Sidebar/></div>
      <div>
      <Table border="1" style={{margin:"auto auto",padding:"50px",widows:"90%"}}>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
            {
              userCourses.map((course,index)=>{
                return(
                  <tr  key={index}> 
                  <td > {course.Code}</td>
                  <td > {course.Name}</td>
                  </tr>
                )
              
            })}
            <tr>
              <td colSpan={2} style={{textAlign:"center"}}> 
                <Button  onClick ={() => updateCourse() }  variant="outlined" color="error">
                   Confirm Changes
                </Button> 
              </td>
            </tr>
            </tbody>
        </Table>
      </div>

      <div style={{padding:"2%"}}>

      <Table border="1" style={{margin:"auto auto",padding:"50px",widows:"90%"}}>
        <thead>
        <tr>
          <th>Code</th>
          <th>Name</th>
          <th>Credits</th>
          <th>Duration</th>
          <th>Description</th>
          <th>Faculty</th>
          <th colSpan={2} >Options</th>
        </tr>
        </thead>
        <tbody>
        {courses.map((course,index)=> {
          return(                            
            <tr  key={index}> 
                <td > {course.Code}</td>
                <td > {course.Name}</td>
                <td > {course.Credits}</td>
                <td > {course.Duration} </td>
                <td > {course.Description} </td>
                <td > {course.Faculty} </td>


                <td style={{textAlign:"center"}}> 
                  <Button onClick={() => enrollCourse(course)} variant="outlined" color="primary">
                    Enroll
                  </Button>
                  </td>
                <td style={{textAlign:"center"}}> 
                  <Button  onClick ={() =>  unenrollCourse(course)}  variant="outlined" color="error">
                    UnEnroll
                  </Button> 
                </td>

      
            </tr>    
          )})} 
        </tbody>
      </Table>

      </div>
      </div>
    </div>
  )
}
}

export default dashboard