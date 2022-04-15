import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Change the value of text Field 
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://api-inote.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect

            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('user', json.username);
            navigate('/');
            props.showAlert("logged in Successfully ", "success");

        }
        else {
            props.showAlert("Invalid Email or Password ", "danger");
        }
    }

    return <div className='p-3 m-4'>
        <form onSubmit={handleSubmit}>
            <h3 className='mb-3'>Login a Account to use iNoteManager </h3>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-outline-dark">Submit</button>

            <div className='my-2'>
                Dont have an Account ? <Link to='/signup' style={{textDecoration:"none"}}>{" "}click here</Link>
            </div>
        </form>
    </div>
};

export default Login;
