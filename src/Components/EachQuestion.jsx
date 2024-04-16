import React from "react";

const EachQuestion = ({ quizData }) => {
  return (
    <>
      { Object.keys(quizData).length ==0? (
        <p>Loading....</p>
      ) : (
        <>
          <h2>{quizData.title}</h2>
          <ul>
            {quizData.questions.map((question) => (
              <li key={question.id}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.answers.map((answer) => (
                    <li key={answer.id}>
                     <input type="checkbox" checked={false} /> {answer.optionName} 
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default EachQuestion;
