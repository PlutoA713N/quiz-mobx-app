import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import CreateQuiz from "./Components/CreateQuiz";
import GetQuiz from "./Components/GetQuiz";
import GetResults from "./Components/GetResults";
import LoginButton from "./Components/LoginButton";
import LogoutButton from "./Components/LogoutButton";
import Profile from "./Components/Profile";
import { useAuth0 } from "@auth0/auth0-react";


const App = () => {

  const [showResults, setShowResults] = useState(false)

  const { isLoading, error, isAuthenticated } = useAuth0();
  if (error) {
    return <p>Authentication Error</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Router>
      <div>
       <h1>Welcome to the App</h1>
        <h2>Auth0 Login</h2>
        <LoginButton />
        <LogoutButton />
        <Profile />
        <button onClick={() => setShowResults(!showResults)}>Show Results</button>
        { showResults && isAuthenticated && <GetResults />}
      </div>

      <Routes>
 
        <Route path="/quiz/:id" element={<GetQuiz />} />
      
      </Routes>
    </Router>
  );
}

export default App;
