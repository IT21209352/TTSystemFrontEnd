import React from 'react';
import { useDispatch} from 'react-redux';
import axios from "axios"
import { authActions } from '../src/store';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true

function Niv(props){

  const dispatch = useDispatch()
  const history = useNavigate();
    
  const sendLogoutReq = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/logout", null, {
        withCredentials: true
      });
      if (res.status === 200) {
        return res;
      } else {
        throw new Error("Unable to Logout");
      }
    } catch (error) {
      console.error("Error occurred during logout:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    sendLogoutReq()
      .then(() => {
        dispatch(authActions.logout());
        // Redirect to signIn page after logout
        history("/signIn");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  }
 


    function setdata() {
        if (document.getElementById("notification").hidden==false)
        document.getElementById("notification").hidden=true;
        else
        document.getElementById("notification").hidden=false;
       
      }
    return  <div className="topbar">
    <div className="topbarWrapper">
      <div className="topLft">
          <span className="lgo">{props.name}</span>
      </div>
      <div className="topRgt">

          <div className="topIcon" onClick={() =>( setdata())}>
          </div>
          <div className="topIcon">
            {props.customString}
          </div>
          <div onClick={handleLogout} className="topIcon">
           <span >SIGNOUT</span> 
          </div>
      </div>
     
    </div>
    
  </div>
}
export default Niv;


    
