import React from 'react';
import "./note.css";
import { Trash2 as DeleteIcon } from 'lucide-react'; 

let timer=500,timeout: string | number | NodeJS.Timeout | undefined
export default function Note(props: any) {

const debounce=(func: any)=>{
clearTimeout(timeout)

timeout=setTimeout((func: any,timer: any)=>{
  },timer);
}

const updateText=(text: any,id: undefined)=>{
  debounce(()=>props.updateText(text,id))
}
  return (
    <div className="note" style={{ backgroundColor: props.note.color }}>
      <textarea className="note_text" defaultValue={props.note.text}  onChange={(event)=>updateText(event.target.value,props.note.id)}/>
      <div className="note_footer">
        <p className="text-black">{props.note.time}</p>
        <DeleteIcon className="cursor-pointer text-black " size={20}  onClick={()=>props.deleteNote(props.note.id)}/>
      </div>
    </div>
  );
}