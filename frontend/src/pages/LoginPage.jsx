import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [aadharCardNumber, setAadharCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/login`, {
            aadharCardNumber,
            password,
          });

          // Store the token in localStorage 
          localStorage.setItem('token', response.data.token);

          // Navigate to the admin page or home page after successful login
          if(response.data.role == "admin"){
            navigate('/admin')
          }else{
            navigate('/profile')
          }

          
        } catch (error) {
            console.log(error)
            setError('Login failed. Please check your credentials.');
        }
      };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Card Number</label>
          <input
            type="text"
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  </div>
  )
}

export default LoginPage