import React, { FormEvent, useState } from "react";
import { ReactSVG } from "react-svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCredentials } from "../../redux/authSlice";
import { useAppDispatch } from "../../redux/hooks";

interface SignUpInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationError {
  path: string;
  msg: string;
}

const SignUp = () => {

  const [inputs, setInputs] = useState<SignUpInputs>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    setIsLoading(true);
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (inputs.password !== inputs.confirmPassword) {
      setConfirmPasswordError("Passwords does not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/users", inputs, {
        withCredentials: true,
      });
      setIsLoading(false);
      dispatch(setCredentials(res.data));
      console.log(res.data);
      navigate("/");
    } catch (e: any) {
      const error: ValidationError = e.response.data;
      if (error.path === "username") setUsernameError(error.msg);
      else if (error.path === "email") setEmailError(error.msg);
      else if (error.path === "password") setPasswordError(error.msg);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Log in to MERN</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          value={inputs.username}
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          placeholder="Username"
          type="text"
          required
        />
        {usernameError ? <p className="error">{usernameError}</p> : null}
        <input
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          placeholder="Email"
          type="email"
          required
        />
        {emailError ? <p className="error">{emailError}</p> : null}
        <input
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          placeholder="Password"
          type="password"
          required
        />
        {passwordError ? <p className="error">{passwordError}</p> : null}
        <input
          value={inputs.confirmPassword}
          onChange={(e) =>
            setInputs({ ...inputs, confirmPassword: e.target.value })
          }
          placeholder="Confirm Password"
          type="password"
          required
        />
        {confirmPasswordError ? (
          <p className="error">{confirmPasswordError}</p>
        ) : null}
        {!isLoading ? (
          <button type="submit" className="login-button">
            Sign up
          </button>
        ) : (
          <button disabled className="login-button">
            Loading...
          </button>
        )}
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
        Already have an account?{" "}
        <Link className="s-l" to="/signin">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUp;