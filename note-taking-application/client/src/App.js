import './App.css';
import AllNotes from './components/AllNotes';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <h1>Note Storing</h1>
      <Router>
        <Routes>
          <Route path="/" element={<AllNotes/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
