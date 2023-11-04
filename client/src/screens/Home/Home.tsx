import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { setCredentials } from '../../redux/authSlice';
import { SignIn } from '../SignIn/SignIn';
import { useAppDispatch } from '../../redux/hooks';
const Home = () => {
  const dispatch = useAppDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    axios.get('/api/users/profile').then(res => {
      setLoggedIn(true);
      dispatch(setCredentials(res.data));
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <>{
      !loggedIn ? <SignIn /> : <div>hello</div> 
    }</>
  )
}

export default Home