import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }


  let location = useLocation();
  return (
    <nav className="navbar  navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">iNoteManager</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/add" ? "active" : ""}`} aria-current="page" to="/add">Add Note</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/allNotes" ? "active" : ""}`} aria-current="page" to="/allNotes">All Notes</Link>
            </li>
          </ul>

          {localStorage.getItem("user") ? <div className="d-flex" style={{ color: "white", marginRight: "10px" }}>
            {localStorage.getItem("user")}
          </div> : " "

          }
          {!localStorage.getItem("token") ? <form className="d-flex">

            <Link className="btn btn-outline-light mx-1 my-2" role="button" to='/login'>Login</Link>
            <Link className="btn btn-outline-light mx-1 my-2" role="button" to='/signup'>SignUp</Link>

          </form> : (
            <button onClick={handleLogout} className="btn btn-outline-light mx-1 my-2" >Logout</button>)
          }
        </div>
      </div>
    </nav>
  );

}

export default Navbar;
