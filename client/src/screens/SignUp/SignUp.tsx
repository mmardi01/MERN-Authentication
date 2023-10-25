import React, { FormEvent, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { Link } from 'react-router-dom';

interface SignUpInputs {
  username:string;
  email:string;
  password:string;
}


const SignUp = () => {

  const [inputs, setInputs] = useState<SignUpInputs>({
    username:'',
    email:'',
    password:''
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          value={inputs.username}
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
        <button type="submit" className="login-button">
          Sign up
        </button>
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
        Already have an account? <Link className="s-l" to='/' >Sign in</Link> 
      </p>
    </div>
  )
}

export default SignUp