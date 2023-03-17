import { useState, createContext, useEffect } from 'react';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import './App.css';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  })
  const admin = {
    username: 'task@gmail.com',
    password: '12345678'
  }

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem('user'));
    if (x?.username !== '') {
      setUser({ ...x });
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{user, setUser, admin}}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
