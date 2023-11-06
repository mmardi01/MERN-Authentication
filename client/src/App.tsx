import React from 'react';
import './App.css';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,Outlet} from 'react-router-dom'
import SignUp from './screens/SignUp/SignUp';
import { SignIn } from './screens/SignIn/SignIn';
import Home from './screens/Home/Home';
import ReduxProvider from './provider';

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
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

const Root = () => {
  return (
    <ReduxProvider>
      <Outlet />
    </ReduxProvider>
  )
}

export default App;