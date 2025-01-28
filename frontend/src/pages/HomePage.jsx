import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

  return (
    <div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 ">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to the Voting App</h1>
        <div className="flex flex-col space-y-4">
          <button 
            onClick={()=> navigate('/login')}
            className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/signup')} 
            className="px-6 py-3 text-lg font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Signup
          </button>
          <p className="text-lg text-gray-700 font-medium">or</p>
          <button
            onClick={() => navigate('/checkVotes')}
            className="px-6 py-3 text-lg font-medium text-white bg-purple-500 rounded-lg hover:bg-purple-600"
          >
            Check Votes
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default HomePage