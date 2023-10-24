import React, {useState} from "react";
import "./SignIn.css";
import { ReactSVG } from "react-svg";

interface LoginInputs {
  username:string;
  password:string;
}

export const SignIn = () => {

  const [inputs, setInputs] = useState<LoginInputs>({
    username:'',
    password:''
  })

  return (
    <div className="login-page">
      <h1>Log in to MERN</h1>
      <form className="login-form">
        <input 
          value={inputs.username}
          onChange={(e) => setInputs({...inputs, username: e.target.value})}
          placeholder="Username" 
          type="text" 
          />
        <input
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
          placeholder="Password" 
          type="password" 
        />
        <p className="forgot">Forgot your password?</p>
        <button type="submit" className="login-button">
          Log in
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
          Log in
        </button>
        <button className="g-f-login">
          <ReactSVG src="facebookIcon.svg" />
          Log in
        </button>
      </div>
      <p className="signup-link">
        Don't have an account? <span>Sign up</span> 
      </p>
    </div>
  );
};