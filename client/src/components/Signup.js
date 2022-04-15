import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch('https://api-inote.herokuapp.com/api/auth/createuser', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ name, email, password })

        });
        const json = await response.json();
        console.log(json);


        // Save the auth token and redirect
        if (json.success) {
            // Save the auth token and redirect

            localStorage.setItem('token', json.authtoken);
            navigate('/login');
            props.showAlert("Account Created Successfull ", "success");

        }
        else {
            props.showAlert("Invalid Details", "danger");
        }



    }



    return <div className='container m-1 p-2'>
        <form onSubmit={handleSubmit}>
            <h3 className='mb-3'>Create a Account to use iNoteManager </h3>
            <div className="mb-2">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={onChange} id="name" name="name" required />
            </div>
            <div className="mb-2">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={onChange} id="email" name="email" required />
            </div>
            <div className="mb-2">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} id="password" name='password' minLength={5} required />
            </div>
            <div className="mb-2">
                <label htmlFor="cpassword" className="form-label">ConfirmPassword</label>
                <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' minLength={5} required />
            </div>
            <button type="submit" className="btn btn-outline-dark">Submit</button>
            <div className='my-2'>
                Already have an Account ? <Link to='/login' style={{ textDecoration: "none" }}>{" "}click here</Link>
            </div>
        </form>
    </div>;
};

export default Signup;
