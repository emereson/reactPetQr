import React, { Suspense, lazy, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

const AdminGenereateQrLazy = lazy(() => import('./pages/AdminGenereateQr'));
const ProtectedRoutesLazy = lazy(() => import('./pages/ProtectedRoutes'));
const AdminUsersLazy = lazy(() => import('./pages/AdminUsers'));
const AdminSponsorsLazy = lazy(() => import('./pages/AdminSponsors'));
const AdminRegisterLazy = lazy(() => import('./pages/AdminRegister'));
const AdminLoginLazy = lazy(() => import('./pages/AdminLogin'));
const UserRegisterPetLazy = lazy(() => import('./pages/UserRegisterPet'));

function App() {
  const [intro, setintro] = useState(false);

  setTimeout(() => {
    setintro(true);
  }, 3000);
  return (
    <div>
      {!intro ? (
        <div className="intro__container" style={intro ? { opacity: 0, zIndex: -1 } : {}}>
          <img src="intro1.gif" alt="" />
        </div>
      ) : (
        ''
      )}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/admin">
            <Route path="register" element={<AdminRegisterLazy />} />
            <Route path="login" element={<AdminLoginLazy />} />
          </Route>
          <Route path="/user">
            <Route path="registerPet/:id" element={<UserRegisterPetLazy />} />
          </Route>
          <Route element={<ProtectedRoutesLazy />}>
            <Route path="/admin/generateQr" element={<AdminGenereateQrLazy />} />
            <Route path="/admin/users" element={<AdminUsersLazy />} />
            <Route path="/admin/sponsor" element={<AdminSponsorsLazy />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
