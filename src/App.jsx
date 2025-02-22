import './App.css'
import Login from './views/login'
import { Route, Routes, Navigate } from 'react-router-dom'
import Singup from './views/Singup'
import Dashboard from './views/Dashboard'
import ProtectedRoute from '../routes/ProtectedRoute'
import Home from './views/Home'
import Navbar from './components/Navbar'
import Logout from './views/Logout'
import NotFound from './views/NotFound'
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
        <Route path="/Singup" element={<Singup />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
