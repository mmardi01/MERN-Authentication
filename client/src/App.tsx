import React, { useEffect } from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,Outlet, useNavigate} from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp';
import { SignIn } from './screens/SignIn/SignIn';
import Home from './screens/Home/Home';
import ReduxProvider from './provider';
import authSlice, {removeCredentials, setCredentials} from './redux/authSlice';
import { useAppDispatch } from './redux/hooks';
import axios from 'axios';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route index element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Route>
    )
  )

  return (
  <ReduxProvider>
    <div className="App">
      <RouterProvider router={router} />
    </div>
  </ReduxProvider>
  );
}

const Root = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users/profile').then(res => {
      dispatch(setCredentials(res.data));
    }).catch((err) => {
      dispatch(removeCredentials())
      navigate('/signin')
    })
  }, [dispatch,navigate]);

  return (
      <Outlet />
  )
}

export default App;