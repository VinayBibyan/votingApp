import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          // Redirect to login page if no token is found
          navigate('/login');
          return;
        }
    
        // Fetch user profile data
        const fetchProfileData = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/user/profile`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
    
            setUserData(response.data);
          } catch (err) {
            console.log(err);
            setError('Failed to fetch user data. Please try again.');
          }
        };
    
        fetchProfileData();
      }, [navigate]);

      if (error) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-red-500">{error}</p>
            </div>
          </div>
        );
      }
    
      if (!userData) {
        return (
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p>Loading user data...</p>
            </div>
          </div>
        );
      }

  return (
    <div className="min-h-screen flex flex-col justify-center  bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      {/* User Profile Section */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">User Profile</h1>
          <div className="space-y-4">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Age:</strong> {userData.age}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <p><strong>Aadhar Card Number:</strong> {userData.aadharCardNumber}</p>
          </div>
        </div>
      </div>

      {/* Spacer Section */}
      <div className="my-6"></div>

      {/* Navigation Button Section */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/voteToCandidate')}
          className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        >
          Vote to candidate
        </button>
      </div>
    </div>
  )
}

export default ProfilePage