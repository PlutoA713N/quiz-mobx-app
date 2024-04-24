import React, { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom";
import GetQuiz from "./GetQuiz";

const RouteQuiz = () => {
  const { loginWithRedirect } = useAuth0();
  const { id } = useParams();
  const [redirectURL, setRedirectURL] = useState(null);

  useEffect(() => {
    const redirectToLogin = async () => {
      try {
        const randomValue = Math.random().toString(36).substring(2);
        localStorage.setItem(randomValue, `/quiz/${id}`);
        
        await loginWithRedirect({
          state: randomValue
        });
      } catch (error) {
        console.error("Error redirecting to login:", error);
      }
    };

    redirectToLogin();
  }, [loginWithRedirect, id]);

  useEffect(() => {
    const retrieveRedirectURL = () => {
      const stateParam = new URLSearchParams(window.location.search).get('state');
      const url = localStorage.getItem(stateParam);
      setRedirectURL(url);
    };

    retrieveRedirectURL();
  }, []);

  return redirectURL ? <GetQuiz id={id} /> : null;
};

export default RouteQuiz;
