import React, { FormEvent, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface SignUpInputs {
  username:string;
  email:string;
  password:string;
  confirmPassword:string;
}

const SignUp = () => {

  const [inputs, setInputs] = useState<SignUpInputs>({
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  })


  const [isLoading,setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    if (!inputs.password || inputs.password !== inputs.confirmPassword)
      return;
    setIsLoading(true);
    try {
      await axios.post('/api/users',inputs, {
        withCredentials: true
      }
      );
      setIsLoading(false);
      navigate('/');
    }
    catch(e: any) { 
      console.log(e.response.data.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="login-page">
      <h1>Log in to MERN</h1>
      <form
        onSubmit={handleSubmit} 
        className="login-form">
        <input 
          value={inputs.username}
          onChange={(e) => setInputs({...inputs, username: e.target.value})}
          placeholder="Username" 
          type="text" 
          />
          <input 
          value={inputs.email}
          onChange={(e) => setInputs({...inputs, email: e.target.value})}
          placeholder="Email" 
          type="email" 
          />
        <input
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
          placeholder="Password" 
          type="password" 
        />
        <input
          value={inputs.confirmPassword}
          onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}
          placeholder="Confirm Password" 
          type="password" 
        />
        {
          !isLoading ?
          <button type="submit" className="login-button">
          Sign up
        </button>
        :
        <button disabled  className="login-button">
          Loading...
        </button>
        }
      </form>
      <div className="devider">
        <div className="line"></div>
        <p>or continue with</p>
        <div className="line"></div>
      </div>
      <div className="g-f-buttons">
        <button className="g-f-login">
          <ReactSVG src="googleIcon.svg" />
          Sign up
        </button>
        <button className="g-f-login">
          <ReactSVG src="facebookIcon.svg" />
          Sign Up
        </button>
      </div>
      <p className="signup-link">
        Already have an account? <Link className="s-l" to='/signin' >Sign in</Link> 
      </p>
    </div>
  )
}

export default SignUp