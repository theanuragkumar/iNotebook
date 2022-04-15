import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    let navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        //eslint-disable-next-line
    }, [])

    const [note, setNote] = useState({ title: "", description: "", tag: "", date:"" });
    const handleClick = (e) => {
        e.preventDefault();  // Avoid Page to reload
        try {
            addNote(note.title, note.description, note.tag, note.date);
            setNote({ title: "", description: "", tag: "" ,date:""});
            props.showAlert("Added Successfully", "success");
            navigate('/');
        }
        catch {
            props.showAlert("Some Error Occured", "error");
            navigate('/');
        }
    }

    // Change the value of text Field 
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return <div className='p-2 m-4'>
        <h3>Add a Note</h3>
        <div>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} minLength={5} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={note.date} onChange={onChange} required/>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-outline-dark" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    </div>;
};

export default AddNote;
