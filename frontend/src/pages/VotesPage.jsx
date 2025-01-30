/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';

function VotesPage() {
    const [candidates, setCandidates] = useState([]);
    const [voteCounts, setVoteCounts] = useState([]);
    const [loading, setLoading] = useState({ candidates: true, votes: true });
    const [error, setError] = useState({ candidates: null, votes: null });

    useEffect(() => {
        const fetchCandidates = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/vote/list`);
            setCandidates(response.data);
            setError((prev) => ({ ...prev, candidates: null }));
          } catch (err) {
            setError((prev) => ({ ...prev, candidates: 'Failed to fetch candidates' }));
          } finally {
            setLoading((prev) => ({ ...prev, candidates: false }));
          }
        };
    
        const fetchVoteCounts = async () => {
          try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/vote/count`);
            setVoteCounts(response.data);
            setError((prev) => ({ ...prev, votes: null }));
          } catch (err) {
            setError((prev) => ({ ...prev, votes: 'Failed to fetch vote counts' }));
          } finally {
            setLoading((prev) => ({ ...prev, votes: false }));
          }
        };
    
        fetchCandidates();
        fetchVoteCounts();
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Candidates Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Candidates</h2>
          {loading.candidates ? (
            <p className="text-gray-600">Loading candidates...</p>
          ) : error.candidates ? (
            <p className="text-red-600">{error.candidates}</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <li
                  key={candidate._id}
                  className="flex justify-between items-center py-4 hover:bg-gray-50 px-4 rounded-lg"
                >
                  <span className="text-lg text-gray-800 font-medium">{candidate.name}</span>
                  <span className="text-gray-700 text-lg italic">({candidate.party})</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Vote Counts Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Vote Counts</h2>
          {loading.votes ? (
            <p className="text-gray-600">Loading vote counts...</p>
          ) : error.votes ? (
            <p className="text-red-600">{error.votes}</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {voteCounts.map((vote) => (
                <li
                  key={vote.party}
                  className="flex justify-between items-center py-4 hover:bg-gray-50 px-4 rounded-lg"
                >
                  <span className="text-lg text-gray-800 font-medium">{vote.party}</span>
                  <span className="text-gray-600">{vote.count} votes</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default VotesPage