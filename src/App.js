import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './pages/authentication/login.js'
import Login from './pages/authentication/login.js';
import Register from './pages/authentication/register.js';
import Dashboard from './pages/dashboard/dashboard';
import NewBoard from './pages/board/newBoard/newBoard';

function App() {
  return (
    <BrowserRouter>
      <div>
        
      </div>
      <div className='font-mainFont'>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/newBoard'  element={<NewBoard/>}/>
        </Routes>

      </div>
    
    </BrowserRouter>
  );
}

export default App;
