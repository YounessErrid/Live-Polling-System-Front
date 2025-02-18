import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './views/login'
import { Route, Routes } from 'react-router'
import Singup from './views/Singup'
import { Home } from './views/Home'
import ProtectedRoute from '../routes/ProtectedRoute'

function App() {

  return (
    <Routes>

      <Route element={<ProtectedRoute/>}>
        <Route path='/' element={<Home/>}></Route>
      </Route>

      <Route path="/Login" element={<Login/>}/>
      <Route path="/Singup" element={<Singup/>}/> 

    </Routes>
  )
}

export default App
