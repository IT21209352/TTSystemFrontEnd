import React, { useState ,useEffect ,Component } from "react";
import {Box,Button,Table,TextField ,  MenuItem, InputLabel,Select} from "@mui/material"
import axios  from "axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/adminSidebar';
import Navi from '../components/Niv';


function adminManageTimeTable() {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);

  const [inputs,setInputs] = useState({
    Course:"",
    Faculty:"",
    Location:"",
    StartTime:"",
    EndTime:"",
    Date:""
  })

  const [editSessionId, seEditSessionid] = useState(null);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
  
    setInputs((prev) => ({
      ...prev,
      Date: value,
    }));
  };
  
  const handleStartTimeChange = (e) => {
    const { name, value } = e.target;
  
    setInputs((prev) => ({
      ...prev,
      StartTime: value,
    }));
  };
  
  const handleEndTimeChange = (e) => {
    const { name, value } = e.target;
  
    setInputs((prev) => ({
      ...prev,
      EndTime: value,
    }));
  };

  useEffect(() => {
    function getCourseData() {
      axios.get("http://localhost:5000/course/getcoursedata").then((res) => {
        console.log(res.data)
        setCourses(res.data)
      });
    }
    getCourseData()
  }, []);

  useEffect(() => {
    function getCourseData() {
      axios.get("http://localhost:5000/session/getsessions").then((res) => {
        setSessions(res.data)
      });
    }
    getCourseData()
  }, []);


  const handleEditSession = ()=>{

  }

  const remvoeSession = ()=>{

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.Course || !inputs.Faculty || !inputs.Location|| !inputs.Date || !inputs.StartTime || !inputs.EndTime) {
      toast.error("Please Complete the Form");
      return;
    }
    if (editSessionId) {
      // Update the course if editCourseId is present
      axios.put(`http://localhost:5000/course/updatecourse/${editSessionId}`, inputs)
        .then(() => {
          toast.success("Session Updated");
          setEditSessionId(null);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add a new course if editCourseId is not present
      sendRequest().then(() => {
        toast.success("Session Registered");
        window.location.reload();
      });
    }
  };

  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/session/addsession",inputs)
    .catch((err)=>console.log(err))
    const data = await res.data
    console.log(data)
    return data
  }
    

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "radio-buttons-group") {
      // Handle radio button separately
      setInputs((prev) => ({
        ...prev,
        Type: value,
      }));
    } else {
      // Handle other inputs
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  return (
    <div>
    <ToastContainer position="top-right" theme="colored" /> 
    <Navi name="Dashboard"  />
    <div className="grid-container">
    <div><Sidebar/></div>
   
    {/* onSubmit={handleSubmit} */}
    <div>
      <form  style={{ padding: "5%" }}>
          <FormControl fullWidth>
            <InputLabel id="course-select-label">Select Course</InputLabel>
            <Select
              labelId="course-select-label"
              id="course-select"
              value={inputs.Course}
              onChange={handleChange}
              name="Course"
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course.Code + " " + course.Name}>{course.Name} - {course.Code}</MenuItem>
              ))}
            </Select>
          </FormControl>


          <FormControl fullWidth>
            <InputLabel id="faculty-select-label">Select Faculty</InputLabel>
            <Select
              labelId="faculty-select-label"
              id="faculty-select"
              value={inputs.Faculty}
              onChange={handleChange}
              name="Faculty"
          
            >
              <MenuItem value={"Faculty of Computing"}>Faculty of Computing</MenuItem>
              <MenuItem value={"Faculty of Business"}>Faculty of Business</MenuItem>
              <MenuItem value={"Faculty of Engineering"}>Faculty of Engineering</MenuItem>
          
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="location-select-label">Select Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={inputs.Location}
              onChange={handleChange}
              name="Location"
          
            >
              <MenuItem value={"ClassRoom 1"}>ClassRoom 1</MenuItem>
              <MenuItem value={"ClassRoom 1"}>ClassRoom 2</MenuItem>
              <MenuItem value={"ClassRoom 1"}>ClassRoom 3</MenuItem>
          
            </Select>
          </FormControl>

          <br />
          <label htmlFor="startDate">Select Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="Date"
            value={inputs.Date}
            onChange={handleDateChange}
          />
            <br />
            <label htmlFor="startTime">Select Start Time:</label>
            <input
              type="time"
              id="startTime"
              name="StartTime"
              value={inputs.StartTime}
              onChange={handleStartTimeChange}
            />
                      <br />
            <label htmlFor="endTime">Select End Time:</label>
            <input
              type="time"
              id="endTime"
              name="EndTime"
              value={inputs.EndTime}
              onChange={handleEndTimeChange}
            />
                    <br />
        {/*   <Button variant="contained" type="submit" onClick={handleSubmit}> */}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>

        </form>
      </div>
 
      <div style={{padding:"2%"}}>

          <Table border="1" style={{margin:"auto auto",padding:"50px",widows:"100%"}}>
            <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Faculty</th>
              <th>Location</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th colSpan={2}>Options</th>
            </tr>
            </thead>
            <tbody>
            {sessions.map((session,index)=> {
              return(                            
                <tr  key={index}> 
                    <td > {session.Course}</td>
                    <td > {session.Date}</td>
                    <td > {session.Faculty}</td>
                    <td > {session.Location} </td>
                    <td > {session.StartTime} </td>
                    <td > {session.EndTime} </td>
                    <td style={{textAlign:"center"}}> <Button onClick={() => handleEditSession(course._id)} variant="outlined" color="primary">Edit</Button></td>
                    <td style={{textAlign:"center"}}> <Button  onClick ={() => remvoeSession(course._id)}  variant="outlined" color="error">Remove</Button> </td>

           
                </tr>    
              )})} 
            </tbody>
          </Table>
      </div>
    </div>
  </div>
  )
}

export default adminManageTimeTable