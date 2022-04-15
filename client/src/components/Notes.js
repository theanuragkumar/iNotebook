import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns'

const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotesByDate, getNotes, editNote } = context;
    const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

    const onDateChange = (e) => {
        setDate(e.target.value);

    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            date ? getNotesByDate(date) : getNotes()
        }
        else {
            navigate('/login');
        }
        //eslint-disable-next-line
    }, [date])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", edate: "" });

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, edate: currentNote.date
        });
    }


    const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.edate);
        refClose.current.click();
        props.showAlert("Updated Successfully", "success");
    }


    // Change the value of text Field 
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (<>

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='conatiner my-3'>
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="edate" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="edate" name="edate" value={note.edate} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>

        <div className='row my-3'>
            <div className='headings'>
                <h2>Your Notes</h2>
                <div className="col-xs-4">
                    <input type="date" className="form-control" id="date" name="date" value={date} onChange={onDateChange} />
                </div>
            </div>


            <div className='container'>{notes.length === 0 && "No Notes to Display"}</div>
            {notes.map((note) => {
                return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}></Noteitem>
            })}
        </div>
    </>
    )
}

export default Notes;
