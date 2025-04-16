
import React from 'react';
import Note from '../Note/note';
import "./notecontainer.css";
import Sidebar1 from "../Sidebar/sidebar"

export default function NoteContainer(props:any) {
  return (
    <div className="note-container">
      <h2 className='font-semibold text-2xl'>Notes</h2>
      <Sidebar1/>
      <div className="note-container_notes custom-scroll">
      {
        props.notes.map((item: any,index: any)=> <Note 
        key={index}
        note={item}
       
        />)
      }
    </div>
    </div>
  );
}