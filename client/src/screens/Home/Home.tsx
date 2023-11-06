import axios from 'axios'
import React, { useEffect } from 'react'
import { setCredentials } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users/profile').then(res => {
      dispatch(setCredentials(res.data));
    }).catch((err) => {
      navigate('/signin')
    })
  }, [dispatch,navigate]);
  
  return (
    <div>Home Page</div> 
  )
}

export default Home