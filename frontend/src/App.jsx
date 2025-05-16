import FeedPage from "./pages/FeedPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Router>
  )
}

export default App
