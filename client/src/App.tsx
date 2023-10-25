import React from 'react';
import './App.css';
import { SignIn } from './screens/SignIn/SignIn';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,Outlet} from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Root/>}>
        <Route index element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <Outlet />
  )
}


export default App;
