import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FeedPage from "./pages/FeedPage"
import ProtectedRoutes from "./components/ProtectedRoutes"
import Register from './pages/Register';
import Login from './pages/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
