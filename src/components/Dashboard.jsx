import React, { useContext, useEffect } from 'react'
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, admin } = useContext(UserContext);

  useEffect(() => {
    if (user.username !== admin.username || user.password !== admin.password) {
      navigate('/');
    }
  }, []);

  return (
    <div className='py-5'>
      <h1>Hello Admin, Welcome to dashboard</h1>
      <h3>Logged in with {user?.username}</h3>
    </div>
  )
}

export default Dashboard