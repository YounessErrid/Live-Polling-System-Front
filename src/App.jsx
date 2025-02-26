import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from '../routes/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'
import NotFound from './views/NotFound'
import Dashboard from './views/Dashboard'

// function Logout() {
//   localStorage.removeItem('access_token');
//   localStorage.removeItem('refresh_token');
//   return <Navigate to="/Login" />;
// }
function RegisterAndLogout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return <Navigate to="/Login" />;
}

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path='/' element={<Home />}></Route>
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/Register" element={<Register />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
