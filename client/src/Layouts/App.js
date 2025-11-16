import React from 'react'
import Login from '../Pages/Login'
import Register from '../Pages/Register';
import Home from '../Pages/Home';
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";

function App() {
  return (
    <Router>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home/>}/>
          </Routes>
      </Router>
  )
}

export default App
