import React, { useState } from 'react';
import UserService from '../Services/UserService';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const [username,setusername ] = useState('')
    const [email,setemail ] = useState('')
    const [password,setpassword ] = useState('')
    const [errors,seterrors ] = useState(
        {
            username : '',
            email : '',
            password:''
        }
    )
    const register = async (e) => {
        e.preventDefault()
        console.log("submitted");
        console.log(username,email,password);
        const data = {
            username : username,
            email : email,
            password:password
        }
        try{
            const response = await UserService.register(data)
            console.log(response);
            toast.success('Successfully created!');
            setemail('');
            setusername('')
            setpassword('')

        }catch(err){
            console.log(err)
            toast.error('failed while signup!');
        }
       

        
        
        
    }
  return (
    <div className='register'>
      <div className='register-cover'>
      <Toaster />
      </div >
      <div className='register-content'>
        <div className='register-header'>
          <h1>Dark Space</h1>
          <p>RH Application</p>
        </div>
        <div className='register-form'>
          <form onSubmit={register}>
            <div className='form-group'>
              <label>UserName</label>
              <input type='text' className='input' placeholder='Enter your UserName' 
              value={username} 
              onChange={(e)=>setusername(e.target.value)}/>
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type='email'className='input' placeholder='Enter your email' 
              value={email}
               onChange={(e)=>setemail(e.target.value)} />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='input' placeholder='Enter your password'
              value={password}
               onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <button type='submit' className='register-btn'>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
