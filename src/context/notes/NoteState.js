
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
const noteInitial= []

  const [notes, setNotes] = useState(noteInitial);


// Get All  Note

const getNotes=async ()=>{

  
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    
  });

  const json =  await response.json();

  setNotes(json);

}



  
  // Add a Note

  const addNote=async (title, description, tag)=>{

    // TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
      body: JSON.stringify({title, description, tag}) 
    });

    const note= await response.json(); 
    setNotes(notes.concat(note));

  }

  // Delete a Note
  const deleteNote= async(id)=>{

  // API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },  
  });
   response.json();


    const newNotes=notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
  }


  // Edit a Note

  const editNote= async (id, title, description, tag)=>{
    // API Call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      
      body: JSON.stringify({title, description, tag}) 
    });
    await response.json(); 
  
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
      
    }
    setNotes(newNotes);
    
  }



    return(
        <NoteContext.Provider value={{notes,addNote, editNote, deleteNote ,getNotes}}>
                {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;