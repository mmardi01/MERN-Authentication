import React, {FormEvent, useState} from "react";
import "./SignIn.css";
import { ReactSVG } from "react-svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppDispatch } from "../../redux/hooks";
import { setCredentials } from "../../redux/authSlice";

interface LoginInputs {
  username:string;
  password:string;
}

export const SignIn = () => {

  const [inputs, setInputs] = useState<LoginInputs>({
    username:'',
    password:''
  })
  const [ userNameError, setUsernameError ] = useState('');
  const [ passwordError, setPasswordError ] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setUsernameError('');
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('/api/users/auth',inputs, {
        withCredentials: true
      });
      setIsLoading(false);
      dispatch(setCredentials(res.data));
      navigate('/');
    }
    catch(e: any) {
      console.log(e.response.data.message);
      if (e.response.data.message === 'user not found')
        setUsernameError('User not found');
      else if (e.response.data.message === 'Incorrect password!')
        setPasswordError('Incorrect password')
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
          {
            userNameError ? <p className="error">Username not found</p> : null
          }
        <input
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password: e.target.value})}
          placeholder="Password" 
          type="password" 
        />
         {
            passwordError ? <p className="error">Incorrect password</p> : null
          }
        <p className="forgot">Forgot your password?</p>
        {
          isLoading ?
          <button disabled type="submit" className="login-button">
          Loading
        </button>
          :
          <button type="submit" className="login-button">
          Log in
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
          Log in
        </button>
        <button className="g-f-login">
          <ReactSVG src="facebookIcon.svg" />
          Log in
        </button>
      </div>
      <p className="signup-link">
        Don't have an account? <Link className="s-l" to='/signup' >Sign up</Link> 
      </p>
    </div>
  );
};
