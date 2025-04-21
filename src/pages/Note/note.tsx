import React from 'react';
import "./note.css";
import { Trash2 as DeleteIcon } from 'lucide-react'; 

export default function Note(props: any) {
  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <textarea className="note_text" defaultValue={props.note.text} />
      <div className="note_footer">
        <p className="text-black">{props.note.time}</p>
        <DeleteIcon className="cursor-pointer text-black " size={20}  onClick={()=>props.deleteNote(props.note.id)}/>
      </div>
    </div>
  );
}
