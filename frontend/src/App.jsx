import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Onboarding from './pages/Onboarding';
import Article from './pages/Course';
import FeedTest from "./pages/Feedtest";
import ProtectedRoutes from "./components/ProtectedRoutes"
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
   <ThemeProvider>
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/feed" element={<FeedTest />} />
            <Route path="/article/:id" element={<Article />} />
          </Route>
          <Route path="/filters" element={<Onboarding />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
   </ThemeProvider>
  )
}

export default App;