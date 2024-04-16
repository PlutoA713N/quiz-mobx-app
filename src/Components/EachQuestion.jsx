import React, { useState, useEffect } from "react";

const EachQuestion = ({ quizData }) => {
  const [questionData, setQuestionData] = useState({});
  
  useEffect(() => {
    const initializedData = {
      ...quizData,
      questions: quizData.questions.map(question => ({
        ...question,
        answers: question.answers.map(answer => ({
          ...answer,
          isChecked: false 
        }))
      }))
    };
    setQuestionData(initializedData);
  }, [quizData]);

  const handleCheckboxChange = (questionIndex, answerIndex) => {
    setQuestionData(prevQuestionData => {
      const updatedQuestions = [...prevQuestionData.questions];
      updatedQuestions[questionIndex] = {
        ...updatedQuestions[questionIndex],
        answers: updatedQuestions[questionIndex].answers.map((answer, index) => {
          if (index === answerIndex) {
            return {
              ...answer,
              isChecked: !answer.isChecked
            };
          }
          return answer;
        })
      };
      return { ...prevQuestionData, questions: updatedQuestions };
    });
  };
  

  const handleSubmit = async () => {
    try {
      const postData = {
        quizId: questionData.id,
        questions: questionData.questions.map(question => ({
          id: question.id,
          questionText: question.questionText,
          answers: question.answers
        })),
        title: questionData.title,
        userId: questionData.userId
      };
  
      const response = await fetch("http://localhost:1337/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("Post request response:", responseData);
    } catch (error) {
      console.error("Error while sending POST request:", error);
    }
  };
  

  return (
    <>
      {Object.keys(questionData).length === 0 ? (
        <p>Loading....</p>
      ) : (
        <>
          <h2>{questionData.title}</h2>
          <ul>
            {questionData.questions.map((question, questionIndex) => (
              <li key={question.id}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.answers.map((answer, answerIndex) => (
                    <li key={answer.id}>
                      <input
                        type="checkbox"
                        checked={answer.isChecked} 
                        onChange={() => handleCheckboxChange(questionIndex, answerIndex)}
                      />{" "}
                      {answer.optionName}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit}>Submit</button> 
        </>
      )}
    </>
  );
};

export default EachQuestion;
