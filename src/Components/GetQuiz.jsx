import React, { useState, useEffect } from "react";
import EachQuestion from "./EachQuestion";

const GetQuiz = ({ id }) => {
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:1337/quiz/${id}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        setQuiz(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchData();
  }, []);


    return (
      <>  
        <EachQuestion quizData={quiz} /> 
      </>
    ); 
};

export default GetQuiz;
