import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocalObservable } from "mobx-react";

const EachQuestion = observer(({ quizData }) => {
  const store = useLocalObservable(() => ({
    responseData: null,
    questionData: {},
    setQuestionData(data) {
      this.questionData = data;
    },
    handleCheckboxChange(questionIndex, answerIndex) {
      const updatedQuestions = [...this.questionData.questions];
      updatedQuestions[questionIndex].answers[answerIndex].isChecked = !updatedQuestions[questionIndex].answers[answerIndex].isChecked;
      this.questionData = {
        ...this.questionData,
        questions: updatedQuestions
      };
    },
    async handleSubmit() {
      try {
        const postData = {
          quizId: this.questionData.id,
          questions: this.questionData.questions.map(question => ({
            id: question.id,
            questionText: question.questionText,
            answers: question.answers
          })),
          title: this.questionData.title,
          userId: this.questionData.userId
        };
    
        const response = await fetch("https://quizbackend-gtn6.onrender.com/quiz/submit", {
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
        this.responseData = responseData;
      } catch (error) {
        console.error("Error while sending POST request:", error);
      }
    }
  }));

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
    store.setQuestionData(initializedData);
  }, [quizData, store]);

  return (
    <>
      {Object.keys(store.questionData).length === 0 ? (
        <p>Loading....</p>
      ) : (
        <>
          <h2>{store.questionData.title}</h2>
          <ul>
            {store.questionData.questions.map((question, questionIndex) => (
              <li key={question.id}>
                <h3>{question.questionText}</h3>
                <ul>
                  {question.answers.map((answer, answerIndex) => (
                    <li key={answer.id}>
                      <input
                        type="checkbox"
                        checked={answer.isChecked} 
                        onChange={() => store.handleCheckboxChange(questionIndex, answerIndex)}
                      />
                      {answer.optionName}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <button onClick={store.handleSubmit}>Submit</button> 

          {store.responseData && (
            <div style={{border: '2px solid yellow'}}>
              <h3>Response Data:</h3>
              <p>quizId: {store.responseData.quizId}</p>
              <p>userId: {store.responseData.userId}</p>
              <p>score: {store.responseData.score}</p>
            </div>

          )}
        </>
      )}
    </>
  );
});

export default EachQuestion;
