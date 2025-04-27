import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import FlashCard from './FlashCard'
import Login from './Login'
import SignUp from './SignUp'
import ProtectedRoute from './ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/card"
          element={
            <ProtectedRoute>
              <FlashCard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
