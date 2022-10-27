import './App.css';

import Chatroom from './components/chatroom/Chatroom';
import Login from './pages/login/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="" element={<Login />} />
      <Route path="/chat" element={<Chatroom />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
