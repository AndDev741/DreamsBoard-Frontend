import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './pages/authentication/login.js'
import Login from './pages/authentication/login.js';
import Register from './pages/authentication/register.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        
      </div>
      <div className='font-mainFont'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>

      </div>
    
    </BrowserRouter>
  );
}

export default App;
