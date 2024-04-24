import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import GetQuiz from './GetQuiz'; 

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-3e5w3b8uhxdlo41m.us.auth0.com"
    clientId="kgi53MIzOzLuyCAgd99t1Bel5rQehLeW"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://dev-3e5w3b8uhxdlo41m.us.auth0.com/api/v2/",
      scope: "read:current_user update:current_user_metadata"
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/quiz/:id" element={<GetQuiz />} />
      </Routes>
    </Router>
  </Auth0Provider>
);
