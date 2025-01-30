// Import necessary libraries
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    mobile: '',
    address: '',
    aadharCardNumber: '',
    password: '',
    role: 'voter', // Default role is 'user'
  });

  const [adminExists, setAdminExists] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminExists();
  }, []);
  
  const checkAdminExists = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/adminExists`);
      setAdminExists(response.data.adminExists);
    } catch (error) {
      console.error('Error checking admin:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    let hasError = false;

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/signup`, formData);
      setSuccess('Signup successful!');
      console.log(response.data);

      navigate('/login');
    } catch (err) {
      hasError = true; // Highlighted: Set `hasError` to true if an error occurs

      if (err.response) {
        setError(err.response.data.error || 'Something went wrong');
      } else {
        setError('Server error, please try again later');
      }
      console.log('Error occurred:', err.response?.data?.error || err.message);
    }

    // Navigate to the dashboard or home page after successful login
    if (!hasError) {
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Signup</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder='Ex-John'
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Age</label>
          <input
            type="number"
            name="age"
            placeholder='Ex-0'
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder='Ex-John@gmail.com'
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">mobile</label>
          <input
            type="number"
            name="mobile"
            placeholder='Ex-1000'
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">address</label>
          <input
            type="text"
            name="address"
            placeholder='Ex-delhi'
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">aadharCardNumber</label>
          <input
            type="text"
            name="aadharCardNumber"
            placeholder='Ex-1000'
            value={formData.aadharCardNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder='Ex-John'
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {!adminExists && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="voter">Voter</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
