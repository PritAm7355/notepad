
import React, { useState } from 'react';
import Note from '../Note/note';
import "./notecontainer.css";

export default function NoteContainer(props:any) {
  return (
    <div className="note-container">
      <h2 className='font-semibold text-3xl'>Notes</h2>
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