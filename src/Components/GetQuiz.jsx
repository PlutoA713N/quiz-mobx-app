import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { observable, action, runInAction } from "mobx";
import EachQuestion from "./EachQuestion";
import { useParams } from "react-router-dom";

const quizStore = observable({
  quiz: {},
  setQuiz(newQuiz) {
    this.quiz = newQuiz;
  }
});

const GetQuiz = observer(( {id} ) => {
  // const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://quizbackend-gtn6.onrender.com/quiz/${id}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        runInAction(() => {
          quizStore.setQuiz(data);
        });
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchData();
  }, [id]);

  return (
    <>  
    {Object.keys(quizStore.quiz).length > 0 && <EachQuestion quizData={quizStore.quiz} />} 
    </>
  ); 
});

export default GetQuiz;
