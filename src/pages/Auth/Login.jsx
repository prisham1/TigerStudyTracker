import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/input/input';
import { LuFeather } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import toast from 'react-hot-toast';
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser} = useContext(UserContext); 

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError("");
    setLoading(true);

    // Login API call
    try {
      const response = await axiosInstance.post('/api/v1/auth/login', {
        email,
        password,
      }); 
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user); 
        navigate("/"); // Redirect to home after successful login
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setError(error.response.data.message); 
    } else {
      setError('An unexpected error occurred. Please try again later.');
    } 
    setLoading(false);
  }
  }; 

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          <LuFeather className="text-2xl text-amber-700" />
          <h3 className="text-2xl font-serif text-amber-900">Welcome Back to TigerStudy</h3>
        </div>

        <p className="text-sm font-light text-stone-700 italic mb-6">
          Return to your study haven — log in to continue.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="e.g. scholar@tigerstudy.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-amber-800 text-white py-2 px-4 rounded-md hover:bg-amber-900 transition-colors shadow-md font-serif disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Enter Study Hall'}
          </button>

          <p className="text-sm text-stone-600 mt-4">
            Don’t have an account?{' '}
            <Link className="font-medium text-amber-800 underline" to="/register">
              Join TigerStudy
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
