import FeedPage from "./pages/FeedPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoutes from "./components/ProtectedRoutes"


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<FeedPage />} />
          <Route path="/feed" element={<FeedPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
