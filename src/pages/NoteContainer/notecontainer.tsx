
import React, { useState } from 'react';
import Note from '../Note/note';
import "./notecontainer.css";

export default function NoteContainer(props:any) {

  const reverArray=(arr:any)=>{
    const array=[]
    for(let i=arr.length-1;i>=0;--i){
      array.push(arr[i]);
    }
    return array
  }
  const notes =reverArray(props.notes)
  return (
    <div className="note-container">
      <h2 className='font-semibold text-3xl'>NotePad</h2>
      <div className="note-container_notes custom-scroll">
      {notes?.length>0?
        notes.map((item: any)=> <Note 
        key={item.id}
        note={item} 
        deleteNote={props.deleteNote}
        updateText={props.updateText}
        />):<h3 className='font-semibold text-xl text-orange-500'>No Notes present</h3>
      }
    </div>
    </div>
  );
} 