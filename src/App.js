import React from 'react'
import Dashboard from './pages/Dashboard';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/'index element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App