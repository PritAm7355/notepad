import  PlusIcon from "../../assets/PlusIcon.png";
import React, {useState } from 'react';
import "./sidebar.css";

export default function sidebar(props:any) {
  const colors=["#fe9b72","#fec971","#00d4fe","#b693fd","#e4ee91"];
  const [listOpen,setListOpen]=useState(false);
  return (
    <div className="sidebar">
  <img src={PlusIcon} alt="Add" onClick={()=>setListOpen(!listOpen)}/>
  <ul className={`sidebar_list ${listOpen?"sidebar_list_active":""}`}>
    {
      colors.map((item: any,index: React.Key | null | undefined)=>(
      <li 
      key={index}
      className="sidebar_list_item"
      style={{backgroundColor:item}}
      onClick={()=>props.addNote(item)}
      />))
    }
  </ul>
    </div>
  )
}
