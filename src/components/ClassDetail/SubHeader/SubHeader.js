import React,{useState,useEffect} from "react";

import SpeedDial from "./SpeedDial/SpeedDial";

import { CheckTeacher } from "../../../api";
import { useParams } from "react-router-dom";

const SubHeader = () => {
  const [teacher,setTeacher] = useState(false)
  const params = useParams()

  useEffect(() => {
    checkTeacher();
 
  }, []);
  const checkTeacher = async ()=>{
    let data = {};
    try {
      data = await CheckTeacher(params.id);
    } catch (error) {
      console.log(error);
    }
    if (data.success) {
      if (data.data[0].type===true){
        setTeacher(true)
      }
    } else {
      if (data.message === "jwt expired") {localStorage.clear();}
    }
  }

  return (
    <>
      {teacher &&  <SpeedDial></SpeedDial>}
     
    </>
  );
};

export default SubHeader;
