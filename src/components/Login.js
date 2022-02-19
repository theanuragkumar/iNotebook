import React from 'react';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setcredentials] = useState({email: "",password: ""});
    const navigate = useNavigate ();

    // Change the value of text Field 
    const onChange = (e)=>{
        setcredentials({...credentials,[e.target.name] :e.target.value})
    }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            
            body: JSON.stringify({email : credentials.email, password : credentials.password})
            
          });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // Save the auth token and redirect

            localStorage.setItem('token' , json.authtoken);
            navigate('/');
            props.showAlert("logged in Successfully ","success");

        }
        else{
            props.showAlert("Invalid Email or Password ","danger");
        }
    }

    return <div>
        <form  onSubmit={handleSubmit}>
            <h2>Login a Account to use iNoteBook </h2>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
};

export default Login;
