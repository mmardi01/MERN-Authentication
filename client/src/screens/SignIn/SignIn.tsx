import React from 'react'
import './SignIn.css'
import { ReactSVG } from 'react-svg'

export const SignIn = () => {


  return (
    <div className='login-page'>
      <h1>Log in to MERN</h1>
      <form className='login-form' >
        <input placeholder='Username' type="text" />
        <input placeholder='Password' type="password" />
        <p className='forgot'>Forgot your password?</p>
        <button type='submit' className='login-button'>Log in</button>
      </form>
      <div className='devider'>
        <div className='line'></div>
        <p>or continue with</p>
        <div className='line'></div>
      </div>
      <div className='g-f-buttons'>
        <button className='g-f-login'>
          <ReactSVG src='googleIcon.svg' />
          Log in
        </button>
        <button className='g-f-login'>
          <ReactSVG src='facebookIcon.svg' />
          Log in
        </button>
      </div>
    </div>
  )
}
