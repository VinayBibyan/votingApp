import HomePage from "./pages/HomePage"
import { Routes, Route } from 'react-router-dom';
import Signup from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import VotesPage from "./pages/VotesPage";
import VoteToCandidatePage from "./pages/VoteToCandidatePage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/checkVotes" element={<VotesPage/>} />
        <Route path="/voteToCandidate" element={<VoteToCandidatePage/>} />
      </Routes>
    </>
  )
}

export default App
