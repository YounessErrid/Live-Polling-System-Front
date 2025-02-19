import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './views/login'
import { Route, Routes } from 'react-router'
import Singup from './views/Singup'
import Dashboard from './views/Dashboard'
import ProtectedRoute from '../routes/ProtectedRoute'
import Home from './views/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Singup" element={<Singup />} />
      </Routes>
    </>
  )
}

export default App
