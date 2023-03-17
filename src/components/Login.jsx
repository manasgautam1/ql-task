import React, { useState, useContext, useEffect } from 'react'
import { useTogglePassword } from '../hooks/useTogglePassword';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser, admin, user } = useContext(UserContext);
  const [passType, toggleType] = useTogglePassword('password');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: false,
    password: false
  })
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === admin.username && user.password === admin.password) {
      navigate('/dashboard');
    }
  }, [user]);

  const handleChange = (e) => {
    setErrors({ ...errors, username: false, password: false})
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  const isValid = () => {
    if (credentials.username.length >= 8 && credentials.password.length>=8 ) {
      return true;
    }
    if (credentials.username.length < 8) {
      setErrors((errors) => ({ ...errors, username: true }));
    }
    if (credentials.password.length < 8) {
      setErrors(errors => ({ ...errors, password: true }));
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      // console.log('form submitted');
      if (credentials.username === admin.username && credentials.password === admin.password) {
        setUser({ ...credentials });
        localStorage.setItem('user', JSON.stringify(credentials));
        navigate('/dashboard');
      }
      else {
        alert('Not a valid user');
      }
    }
  }

  return (
    <div className='d-flex flex-column items-center justify-center login-page'>
      <div className="card shadow-sm bg-white">
        <div className="card-body">
          <h5 className='text-center'>Login Form</h5>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label className='mb-2' htmlFor="username"><strong>Username</strong></label>
              <input id='username' type="text" className="form-control" name='username' placeholder='Enter username' onChange={handleChange} />
              <span className={`text-danger text-sm ${errors.username === true ? 'visible' : 'invisible'}`}>
                Required field with min. 8 characters
              </span>
            </div>
            <div className="form-group mb-4">
              <label className='mb-2' htmlFor="password"><strong>Password</strong></label>
              <div className="input-container">
                <input type={passType} className="form-control" name='password' id='password' placeholder='Enter password' onChange={handleChange} />
                <div className='icons-container'>
                  {passType==='password' && <FaEye onClick={toggleType} size={16} />}
                  {passType==='text' && <FaEyeSlash onClick={toggleType} size={16} />}
                </div>
              </div>
              <span className={`text-danger text-sm ${errors.password === true ? 'visible' : 'invisible'}`}>
                Required field with min. 8 characters
              </span>
            </div>
            <div className='text-center'>
              <button className='btn btn-primary btn-sm px-4 py-1' type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login