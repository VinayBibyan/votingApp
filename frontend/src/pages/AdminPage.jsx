//FOR ALL CANDIDATES ROUTES
import { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState({ name: "", party: "", age: '' });
  const [editCandidate, setEditCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);
// to show all candidates 
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/candidate/candidateList`);
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error)
      setError("Failed to fetch candidates");
      setLoading(false);
    }
  };

  const addCandidate = async () => {
    if (newCandidate.age < 18) {
      setError("Candidate must be at least 18 years old.");
      return;
    }
    
    try {
      setError(null);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/candidate/new`, newCandidate, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCandidates([...candidates, response.data.response]);
      setNewCandidate({ name: "", party: "", age: "" });
    } catch (error) {
      console.log(error)
      setError("Failed to add candidate");
    }
  };

  const updateCandidate = async (id, editCandidate) => {
    try {
      const allowedUpdates = {
        name: editCandidate.name,
        party: editCandidate.party,
        age: editCandidate.age,
      };
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/candidate/${id}`, allowedUpdates, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCandidates(
        candidates.map((candidate) =>
          candidate._id === id ? { ...candidate, ...allowedUpdates } : candidate
        )
      );
      setEditCandidate(null);
    } catch (error) {
      console.log(error)
      setError("Failed to update candidate");
    }
  };

  const deleteCandidate = async (id) => {
    
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/candidate/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCandidates(candidates.filter((candidate) => candidate._id !== id));
    } catch (error) {
      console.log(error)
      setError("Failed to delete candidate");
    }
  };

return (
  <div className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
    {/* Header */}
    <div className="flex justify-center items-center mb-8">
      <h1 className="text-4xl font-extrabold text-red-700 drop-shadow-md">
        Admin Dashboard
      </h1>
    </div>

    {/* Add New Candidate */}
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Add New Candidate
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={newCandidate.name}
          onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Party"
          value={newCandidate.party}
          onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Age"
          value={newCandidate.age}
          onChange={(e) => setNewCandidate({ ...newCandidate, age: e.target.value })}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={addCandidate}
        className="mt-4 w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
      >
        Add Candidate
      </button>
    </div>

    {/* Candidates List */}
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Candidates List
      </h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ):(
        <ul className="space-y-6">
          {candidates.map((candidate) => (
            <li
              key={candidate._id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-md"
            >
              {editCandidate && editCandidate._id === candidate._id ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={editCandidate.name}
                    onChange={(e) =>
                      setEditCandidate({ ...editCandidate, name: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    value={editCandidate.party}
                    onChange={(e) =>
                      setEditCandidate({ ...editCandidate, party: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="number"
                    value={editCandidate.age}
                    onChange={(e) =>
                      setEditCandidate({ ...editCandidate, age: e.target.value })
                    }
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <div className="col-span-1 sm:col-span-3 flex justify-end space-x-4 mt-4">
                    <button
                      onClick={() => updateCandidate(editCandidate._id, editCandidate)}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditCandidate(null)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">
                      {candidate.name}
                    </h3>
                    <p className="text-gray-600">Party: {candidate.party}</p>
                    <p className="text-gray-600">Age: {candidate.age}</p>
                  </div>
                  <div className="mt-4 sm:mt-0 flex space-x-4">
                    <button
                      onClick={() =>
                        setEditCandidate({
                          _id: candidate._id,
                          name: candidate.name,
                          party: candidate.party,
                          age: candidate.age,
                        })
                      }
                      className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCandidate(candidate._id)}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

}

export default AdminPage