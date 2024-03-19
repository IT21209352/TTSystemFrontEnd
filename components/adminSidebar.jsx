import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaQuestionCircle,
    FaMap,
    FaKey
}from "react-icons/fa";
import{BiFoodMenu}from "react-icons/bi";
import { NavLink } from 'react-router-dom';


const adminSidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);

    const menuItem=[
        {
            path:"/usermanagemnt",
            name:"User Management",
            icon:<FaUserAlt/>
        },
        {
            path:"/adminmanagecourses",
            name:"Course Management",
            icon:<BiFoodMenu/>
        },
        // {
        //     path:"/dashboard",
        //     name:"Time Table Management",
        //     icon:<FaMap/>
        // },
    
        {
            path:"/adminmanagetimetables",
            name:"Manage Timetables ",
            icon:<FaTh/>
        },

    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">TTM System</h1>
                   <div style={{marginLeft: isOpen ? "35px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>          
           <main>
                {children}
            </main>
        </div>
    );
};

export default adminSidebar
