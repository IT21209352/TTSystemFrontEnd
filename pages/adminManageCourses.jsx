import React, { useState ,useEffect ,Component } from "react";
import {Box,Button,Table,TextField} from "@mui/material"
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


function adminCourses() {

  const [editCourseId, setEditCourseId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [inputs,setInputs] = useState({
    Name:"",
    Code:"",
    Description:"",
    Credits:"",
    Duration:"",
    Faculty:""
  })

  useEffect(() => {
    function getCourseData() {
      axios.get("http://localhost:5000/course/getcoursedata").then((res) => {
        console.log(res.data)
        setCourses(res.data)
      });
    }
    getCourseData()
  }, []);

  const handleEditCourse = (courseId) => {
    // Find the course with the given ID from the courses array
    const selectedCourse = courses.find((course) => course._id === courseId);
    if (selectedCourse) {
      // Set the inputs state with the selected course's data
      setInputs({
        Name: selectedCourse.Name,
        Code: selectedCourse.Code,
        Description: selectedCourse.Description,
        Credits: selectedCourse.Credits,
        Duration: selectedCourse.Duration
      });
      // Set the editCourseId state to the selected course's ID
      setEditCourseId(courseId);
    }
  };
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
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //     // Handle other inputs
  //     setInputs((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  // };

  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/course/addcourse",inputs)
    .catch((err)=>console.log(err))
    const data = await res.data
    console.log(data)
    return data
  }
    
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (!inputs.Name || !inputs.Credits || !inputs.Description|| !inputs.Duration || !inputs.Code) {
  //     toast.error("Please Complete the Form")
  //     return;
  //   }
  //   console.log(inputs)
  //   sendRequest().then(toast.success("Course Registered")).then(window.location.reload())
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.Name || !inputs.Credits || !inputs.Description|| !inputs.Duration || !inputs.Code) {
      toast.error("Please Complete the Form");
      return;
    }
    if (editCourseId) {
      // Update the course if editCourseId is present
      axios.put(`http://localhost:5000/course/updatecourse/${editCourseId}`, inputs)
        .then(() => {
          toast.success("Course Updated");
          setEditCourseId(null);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add a new course if editCourseId is not present
      sendRequest().then(() => {
        toast.success("Course Registered");
        window.location.reload();
      });
    }
  };

  function removeCourse(id) {
    const isConfirmed = window.confirm("Are you sure you want to remove this Course? This action can not undone!");
    if (isConfirmed) {
      // User clicked "OK", proceed with removal
      axios.delete(`http://localhost:5000/course/removecourse/${id}`)
        .then(window.location.reload())
        .catch((err) => {
          console.log(err);
        });
    } else {
      // User clicked "Cancel", do nothing
      return;
    }
  }


  return (
    <div>
    <ToastContainer position="top-right" theme="colored" /> 
    <Navi name="Dashboard"  />
    <div className="grid-container">
    <div><Sidebar/></div>
      <div style={{padding:"2%"}}>
        <form onSubmit={handleSubmit}>
        <Box
          marginRight={"auto"} 
          marginLeft={"auto"}
          width={300}
          display="flex"
          flexDirection={"column"}
          justifyContent="center"
          alignItems="center"
          textAlign={"center"}
          border={"1px solid black"}
          padding={"10px"}
        >
        <FormLabel>Add a new Course</FormLabel>
          <TextField name="Name" onChange={handleChange} value={inputs.Name} variant="outlined" placeholder='Name' margin='normal'/> 
          <TextField name="Code" onChange={handleChange} value={inputs.Code}  variant="outlined" placeholder='Code' margin='normal'/>
          <TextField name="Credits" onChange={handleChange} value={inputs.Credits} variant="outlined" placeholder='Credits' margin='normal'/>
          <TextField name="Duration" onChange={handleChange} value={inputs.Duration} variant="outlined" placeholder='Duration' margin='normal'/>
          <TextField name="Description" onChange={handleChange} value={inputs.Description} variant="outlined" placeholder='Description' margin='normal'/>

          <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              value={inputs.Type}
              onChange={handleChange} // Add onChange handler to RadioGroup
            >
            <FormControlLabel name="Faculty" value="Faculty of Computing" control={<Radio />} label="Faculty of Computing" />
            <FormControlLabel name="Faculty" value="Faculty of Engineering" control={<Radio />} label="Faculty of Engineering" />
            <FormControlLabel name="Faculty" value="Faculty of Business" control={<Radio />} label="Faculty of Business" />
          </RadioGroup>

          <Button variant="contained" type='submit'>Add</Button>
        </Box>
        </form>
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
                    <td style={{textAlign:"center"}}> <Button onClick={() => handleEditCourse(course._id)} variant="outlined" color="primary">Edit</Button></td>
                    <td style={{textAlign:"center"}}> <Button  onClick ={() => removeCourse(course._id)}  variant="outlined" color="error">Remove</Button> </td>

           
                </tr>    
              )})} 
            </tbody>
          </Table>
 
      </div>
    </div>
  </div>
  )
}

export default adminCourses