
import React from 'react';
import "./note.css"

export default function Note(props:any) {
  return (
    <div className="note" style ={{backgroundColor:props.note.color}}>
        <textarea className="note_text" defaultValue={props.note.text}/>
        <p className='text-black'>{props.note.time}</p>
    </div>
  );
}
