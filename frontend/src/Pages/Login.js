import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserService from '../Services/UserService';
 const Login =()=>{

    const navigate= useNavigate()
    const [username,setusername ] = useState('')
   
    const [password,setpassword ] = useState('')
    const [errors,seterrors ] = useState(
        {
        
            username : '',
            password:''
        }
    )
    const login = async (e) => {
        e.preventDefault()
        console.log("submitted");
        console.log(username,password);
        const data = {
            username : username,
    
            password:password
        }
        try{
            const response = await UserService.signin(data)
            console.log(response);
            localStorage.setItem('token',response.token)
            toast.success('Successfully signin!');
            setusername('')
         
            setpassword('')
            navigate("/home")

        }catch(err){
            console.log(err)
            toast.error('failed while signin!');
        }
       

        
        
        
    }



    return(
        <div className='login'>
      <div className='login-cover'>
      <Toaster />
      </div >
      <div className='login-content'>
      <div className='login-header'>
          <h1>Dark Space</h1>
          <p>RH Application</p>
        </div>
        <div className='login-form'>
          <form onSubmit={login}>
    
    
          <div className='form-group'>
              <label>UserName</label>
              <input type='text' className='input' placeholder='Enter your UserName' 
              value={username} 
              onChange={(e)=>setusername(e.target.value)}/>
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input type='password' className='input' placeholder='Enter your password'
              value={password}
               onChange={(e)=>setpassword(e.target.value)} />
            </div>
            <button type='submit' className='login-btn'>Login</button>
          </form>
        </div>
      </div>
      </div>

    )
 }
 export default Login;