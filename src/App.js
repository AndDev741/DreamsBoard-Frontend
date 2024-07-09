import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import './pages/authentication/login.js'
import RenderForms from './pages/authentication/renderForms';

function App() {
  return (
    <BrowserRouter>
      <div>
        
      </div>
      <div className='font-mainFont'>
        <Routes>
          <Route path='/' element={<RenderForms/>} />
        </Routes>

      </div>
    
    </BrowserRouter>
  );
}

export default App;
