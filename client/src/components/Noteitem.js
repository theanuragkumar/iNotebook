import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';



const Noteitem = (props) => {

    const { note, updateNote } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const compare = (date) => {
        var taskdate = new Date(date);
        var currentdate = new Date();
        if (taskdate.getTime() < currentdate.getTime()) {
            return true;
        }
        else if (taskdate.getTime() > currentdate.getTime()) {
            return false;
        }
    }

    const changeStatus = async (id, status) => {
        var changeStatus = "";
        status === "Incomplete" ? changeStatus = "Completed" : changeStatus = "Incomplete";

        const response = await fetch(`https://api-inote.herokuapp.com/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ status: changeStatus })
        });
        await response.json();
        window.location.reload(false);

    }

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body" style={{ backgroundColor: note.status === "Incomplete" ? "white" : "lightgrey" }}>
                    <div className='d-flex align-items-center'>
                        <h5 className="card-title">{note.title}</h5>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <p style={{ color: compare(note.date) ? "red" : "green", fontSize:"small"}}>{new Date(note.date).toDateString()}</p>
                    <div className='icons'>
                        <i className="fas fa-edit " onClick={() => { updateNote(note); }}></i>
                        <i className="fas fa-trash-alt " onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success"); }}></i>

                        {note.status === "Incomplete" ?
                            <span className="badge bg-success " onClick={() => { changeStatus(note._id, note.status) }}>{note.status}</span>
                            :
                            <span className="badge bg-danger" onClick={() => { changeStatus(note._id, note.status) }}>{note.status}</span>}
                    </div>
                </div>

            </div>
        </div>


    );
};

export default Noteitem;
