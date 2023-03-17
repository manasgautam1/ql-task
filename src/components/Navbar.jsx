import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Navbar = () => {
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username !== '') {
      setLoggedIn(true);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.setItem('user', JSON.stringify({username: '', password: ''}));
    setUser({
      username: '',
      password: ''
    })
    setLoggedIn(false);
    navigate('/');
  }
  console.log(loggedIn);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to='/'>QL Task</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className={`nav-item mx-2 ${location?.pathname === '/dashboard' ? 'active' : ''}`}>
              <Link className="nav-link" to='/dashboard'>Dashboard</Link>
            </li>
            {
              !loggedIn &&
              <li className={`nav-item mx-2 ${location?.pathname === '/' ? 'active' : ''}`}>
                <Link className="nav-link" to="/">Login</Link>
              </li>
            }
            {
              loggedIn && 
              <button className='btn btn-secondary mx-2' onClick={handleLogout}>Logout</button>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar