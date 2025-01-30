/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';

function VoteToCandidatePage() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCandidates = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/vote/list`);
            setCandidates(response.data);
            setError(null);
          } catch (err) {
            setError('Failed to fetch candidates.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchCandidates();
    }, []);

    const handleVote = async (candidateId) => {
        try {
          const token = localStorage.getItem('token'); // Assume JWT is stored in local storage
          console.log(token)
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/vote/voteTo/${candidateId}`,{},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessage(response.data);
        } catch (err) {
          setMessage(err.response?.data?.error || 'An error occurred while voting.');
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">Vote for Your Candidate</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading candidates...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
            <div>
                <h2 className="text-lg font-semibold text-gray-800">{candidate.name}</h2>
                <p className="text-gray-700 italic font-medium">Party: {candidate.party}</p>
            </div>
            <button
                onClick={() => handleVote(candidate._id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
                Vote
            </button>
            </div>
          ))}
        </div>
      )}

      {message && (
        <div className="mt-6 text-center">
          <p className={`text-lg font-semibold ${message.includes('error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        </div>
      )}
    </div>
    </div>
  )
}

export default VoteToCandidatePage