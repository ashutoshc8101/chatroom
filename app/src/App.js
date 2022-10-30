import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Chatroom from './pages/chatroom/Chatroom';
import Login from './pages/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <Login /> } />
        <Route path="/chat" element={ <Chatroom /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
