import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
    let navigate= useNavigate()

    const [user, setUser] = useState({
        name: "",
        username:"",
        email:""
    })

    const{name, username, email} = user
    const onInputChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/user", user)
        navigate("/")
    }

  return (
    <div className='container'>
    <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
        <h2 className='text-center m-4'>Register User</h2>
        <form onSubmit={(e) => onSubmit(e)}>
        <div className='mb-3'>
            <label htmlFor='Name' className='form-label'>Name</label>
            <input onChange={(e) => onInputChange(e)} type='text' className='form-control' placeholder='Enter your name' value={name} name='name'/>
        </div>

        <div className='mb-3'>
            <label htmlFor='username' className='form-label'>Username</label>
            <input onChange={(e) => onInputChange(e)} type='text' className='form-control' placeholder='Enter your username' value={username} name='username'/>
        </div>

        <div className='mb-3'>
            <label htmlFor='email' className='form-label'>E-mail</label>
            <input onChange={(e) => onInputChange(e)} type='text' className='form-control' placeholder='Enter your e-mail address' username={email} name='email'/>
        </div>

        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link  className='btn btn-danger mx-3' to="/">Cancel</Link>
        </form>
        </div>
    </div>
    </div>
  )
}
