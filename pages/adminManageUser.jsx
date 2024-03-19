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



function adminAddStudents() {

  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [inputs,setInputs] = useState({
    Name:"",
    Email:"",
    Password:"",
    Type:""
  })
  const [selectedType, setSelectedType] = useState("All");

  // useEffect(() => {
  //   function getUserData() {
  //     axios.get("http://localhost:5000/api/getuserdata").then((res) => {
  //        // console.log(res.data)
  //        setUsers(res.data)
  //     });
  //   }
  //   getUserData()
  // }, []);

  useEffect(() => {
    function getUserData() {
      axios.get("http://localhost:5000/api/getuserdata").then((res) => {
        // Filter users based on the selected type
        const filteredUsers =
          selectedType === "All"
            ? res.data
            : res.data.filter((user) => user.Type === selectedType);
        setUsers(filteredUsers);
      });
    }
    getUserData();
  }, [selectedType]); // Trigger useEffect when selectedType changes

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "radio-buttons-group") {
      // Handle radio button separately
      setInputs((prev) => ({
        ...prev,
        Type: value,
      }));
    } else if (name === "radio-buttons-group2"){
      setSelectedType(value);
    }else {
      // Handle other inputs
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const sendRequest = async () =>{
    const res = await axios.post("http://localhost:5000/api/signup",inputs)
    .catch((err)=>console.log(err))
    const data = await res.data
    console.log(data)
    return data
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.Name || !inputs.Email|| !inputs.Password|| !inputs.Type) {
      toast.error("Please Complete the Form");
      return;
    }
    if (editUserId) {
      // Update the User if edituserId is present
      axios.put(`http://localhost:5000/api/updateuser/${editUserId}`, inputs)
        .then(() => {
          toast.success("User Updated");
          setEditUserId(null);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Add a new User if editUserId is not present
      sendRequest().then(() => {
        toast.success("User Registered");
        window.location.reload();
      });
    }
  };





  function removeUser(id) {
    const isConfirmed = window.confirm("Are you sure you want to remove this user? This action can not undone!");
    if (isConfirmed) {
      // User clicked "OK", proceed with removal
      axios.delete(`http://localhost:5000/api/removeuser/${id}`)
        .then(window.location.reload())
        .catch((err) => {
          console.log(err);
        });
    } else {
      // User clicked "Cancel", do nothing
      return;
    }
  }

  const handleEditUser = (userID) => {
    // Find the course with the given ID from the courses array
    const selectedUser = users.find((user) => user._id === userID);
    if (selectedUser) {
      // Set the inputs state with the selected course's data
      setInputs({
        Name: selectedUser.Name,
        Email: selectedUser.Email,
        //Password: selectedUser.Password,
        Type: selectedUser.Type,
      });
      // Set the editCourseId state to the selected course's ID
      setEditUserId(userID);
    }
  };


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
          <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Register a New System User</FormLabel>
          </FormControl>
            <TextField name="Name" onChange={handleChange} value={inputs.Name} variant="outlined" placeholder='Name' margin='normal'/> 
            <TextField name="Email" onChange={handleChange} value={inputs.Email} type={"email"} variant="outlined" placeholder='Email' margin='normal'/>
            <TextField name="Password" onChange={handleChange} value={inputs.Password} type={"password"} variant="outlined" placeholder='Password' margin='normal'/>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Student"
              name="radio-buttons-group"
              value={inputs.Type}
              onChange={handleChange} // Add onChange handler to RadioGroup
            >
            <FormControlLabel name="Type" value="Student" control={<Radio />} label="Student" />
            <FormControlLabel name="Type" value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel name="Type" value="Staff" control={<Radio />} label="Staff" />
          </RadioGroup>
            
            <Button variant="contained" type='submit'>Register</Button>
          </Box>
          </form>
        </div>

        <div style={{padding:"2%"}}>

            <Table border="1" style={{margin:"auto auto",padding:"50px",widows:"90%"}}>
              <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th colSpan={3}>Options</th>
              </tr>
                
              <FormControl>
               
               <FormLabel>Select User Type</FormLabel>
               <RadioGroup
                 aria-label="user-type"
                 name="radio-buttons-group2"
                 value={selectedType}
                 onChange={handleChange} // Add onChange handler to RadioGroup
               >
              <tr style={{width:"100%"}}>
             
                      <td>
                      <FormControlLabel
                        value="All"
                        control={<Radio />}
                        label="All"
                      />
                      </td>
                      <td>
                      <FormControlLabel
                        value="Student"
                        control={<Radio />}
                        label="Student"
                      />
                      </td>
                      <td>
                      <FormControlLabel
                        value="Admin"
                        control={<Radio />}
                        label="Admin"
                      />
                      </td>
                      <td>
                      <FormControlLabel
                        value="Staff"
                        control={<Radio />}
                        label="Staff"
                      />
                      </td>
                
               
              </tr>
              </RadioGroup>
                  </FormControl>
              </thead>
              <tbody>
              {selectedType === "Student" ? (
                    users.map((user, index) => (
                      <tr key={index}>
                      <td>{user.Name}</td>
                      <td>{user.Email}</td>
                      <td>{user.Type}</td>
                      <td>
                        
                          {user.Courses.map((course, courseIndex) => (
                            <ul  key={courseIndex}> 
                            <li>{course.Code}-{course.Name}</li>
                              <Button
                                onClick={() => removeUserCourse(courseIndex._id)}
                                variant="outlined"
                                color="error"
                              >
                                Remove
                              </Button>
                            </ul>
                          ))}
                       
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          onClick={() => handleEditUser(user._id)}
                          variant="outlined"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Button
                          onClick={() => removeUser(user._id)}
                          variant="outlined"
                          color="error"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>

                  ))) : (
                users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Type}</td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleEditUser(user._id)}
                        variant="outlined"
                        color="primary"
                      >
                        Edit
                      </Button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Button
                        onClick={() => removeUser(user._id)}
                        variant="outlined"
                        color="error"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            </Table>
   
        </div>
      </div>
    </div>
  )
}

export default adminAddStudents