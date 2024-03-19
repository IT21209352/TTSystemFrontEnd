import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {useSelector} from "react-redux"
import StdDashBoard from '../pages/stdDashboard'
import AdminDashBoard from '../pages/adminDashboard'
import StdTimeTables from '../pages/stdTimeTables'
import AdminManageCourses from '../pages/adminManageCourses'
import SignIn from "../pages/SignIn"
import AdminManageUsers from "../pages/adminManageUser"
import AdminManageTimeTables from "../pages/adminManageTimeTable"

function App() {
  const isLoggedIn = useSelector( (state) => state.isLoggedIn)
  console.log(isLoggedIn)
  return (
    <div className="App">
    <BrowserRouter>
 
      <Routes>
      <Route path="/" element={<SignIn />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/stddashboard" element={<StdDashBoard />} />
        <Route path="/adminmanagecourses" element={<AdminManageCourses />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
        <Route path="/stdTimeTables" element={<StdTimeTables />} />

        <Route path="/usermanagemnt" element={<AdminManageUsers />} />
        <Route path="/adminmanagetimetables" element={<AdminManageTimeTables/>} />

      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
