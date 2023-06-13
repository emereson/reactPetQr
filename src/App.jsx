
import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserRegisterPet from './pages/UserRegisterPet'
import AdminGenereateQr from './pages/AdminGenereateQr'
import ProtectedRoutes from './pages/ProtectedRoutes'
import AdminUsers from './pages/AdminUsers'
import AdminSponsors from './pages/AdminSponsors'
import AdminRegister from './pages/AdminRegister'
import AdminLogin from './pages/AdminLogin'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/admin'>
          <Route path='register' element={<AdminRegister />} />
          <Route path='login' element={<AdminLogin />} />
        </Route>
        <Route path='/user'>
          <Route path='registerPet/:id' element={<UserRegisterPet />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path='/admin/generateQr' element={<AdminGenereateQr />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/sponsor' element={<AdminSponsors />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
