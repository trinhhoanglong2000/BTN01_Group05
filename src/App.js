import React, { useEffect, useState, useContext } from "react";
import {
  Header,
  ClassesContent,
  Login,
  Register,
  ClassDetail,
  People,
  Classwork,
  ShowGrade,
  GradeStructure,
  Grade,
  StudentGrade,
  AdminPage,
  AdminPageClass

} from "./components";

import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import SubHeader from "./components/ClassDetail/SubHeader/SubHeader";
import AccessLink from "./components/AcessLink";
import { io } from "socket.io-client"
import { Context } from './Context/context'
function App() {
  const context = useContext(Context)
  useEffect( async ()  => {
  
    await context?.setSocket(io(process.env.REACT_APP_API_URL))
    
    ////
  }, [])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <ClassesContent />
            </>
          }
        ></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ShowGrade" element={<ShowGrade />} />
        <Route path="/Admin" element ={<AdminPage/>}></Route>
        <Route path="/Admin/Classes" element ={<AdminPageClass/>}></Route>

        
        <Route
          path="/ClassDetail"
          element={
            <>
              <Header />
              <SubHeader />
              <Outlet />
            </>
          }
        >
          <Route path="/ClassDetail/:id" element={<ClassDetail />} />
          <Route path="/ClassDetail/:id/People" element={<People />} />
          <Route path="/ClassDetail/:id/Classwork" element={<Classwork />} />
          <Route path="/ClassDetail/:id/GradeStructure" element={<GradeStructure />} />
          <Route path="/ClassDetail/:id/Grade" element={<Grade />} />
          <Route path="/ClassDetail/:id/StudentGrade" element={<StudentGrade />} />

        </Route>
        <Route
          path="/AccessInviteLink"
          element={<AccessLink open={null} onClose={null} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
