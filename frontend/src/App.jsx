import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Onboarding from './pages/Onboarding';
import Feed from './pages/Feed';
import Article from './pages/Course';
import FeedPage from "./pages/FeedPage";
import ProtectedRoutes from "./components/ProtectedRoutes"
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
   <ThemeProvider>
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<FeedPage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/" element={<Onboarding />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/article/:id" element={<Article />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
   </ThemeProvider>
  )
}

export default App;