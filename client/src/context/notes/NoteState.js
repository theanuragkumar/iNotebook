
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props)=>{
  const host = "https://api-inote.herokuapp.com"
const noteInitial= []

  const [notes, setNotes] = useState(noteInitial);

  
// Get All  Note 

const getNotes=async ()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
  
    },
    
  });
  const json =  await response.json();
  setNotes(json);

}



// Get All  Note on Particular Date

const getNotesByDate=async(date)=>{
  
  const response = await fetch(`${host}/api/notes/fetchallnotes?date=${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token'),
    },
    
  });
  const json =  await response.json();
  setNotes(json);

}



  
  // Add a Note

  const addNote=async (title, description, tag, date)=>{

    // TODO API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
      body: JSON.stringify({title, description, tag, date}) 
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

  const editNote= async (id, title, description, date)=>{

    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },
      
      body: JSON.stringify({title, description, date}) 
    });
    await response.json(); 
  
    let newNotes = JSON.parse(JSON.stringify(notes))

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].date = date;
    
        break;
      }
      
      
    }
    setNotes(newNotes);
    
  }



    return(
        <NoteContext.Provider value={{notes,addNote, editNote, deleteNote ,getNotes, getNotesByDate}}>
                {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;