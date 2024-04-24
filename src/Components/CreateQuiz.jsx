import React from "react";
import { autorun, observable, action, runInAction } from "mobx";
import { observer } from "mobx-react-lite";
import { makeObservable } from "mobx";
import { Link } from "react-router-dom";

class QuizStore {
  quizTitle = "";
  questionText = "";
  answerOptions = [];
  questions = [];
  userId = 0;
  quizResponse = null;

  constructor() {
    makeObservable(this, {
      quizTitle: observable,
      questionText: observable,
      answerOptions: observable,
      questions: observable,
      userId: observable,
      quizResponse: observable,
      handleQuizTitleChange: action,
      handleAddQuestion: action,
      handleAddAnswerOption: action,
      handleAnswerOptionChange: action,
      handleCheckboxChange: action,
      handleSubmitQuiz: action,
    });
  }

  handleQuizTitleChange = (e) => {
    const titleValue = e.target.value;
    runInAction(() => {
      this.quizTitle = titleValue;
    });
  };

  handleAddQuestion = (e) => {
    e.preventDefault();

    if (!this.questionText.trim()) {
      console.error("Question text cannot be empty");
      return;
    }

    if (this.answerOptions.some((option) => !option.optionName.trim())) {
      console.error("Answer option cannot be empty");
      return;
    }

    const newQuestion = {
      questionText: this.questionText,
      answers: this.answerOptions.map((answer) => ({
        optionName: answer.optionName,
        isChecked: answer.isChecked,
      })),
    };

    runInAction(() => {
      this.questions.push(newQuestion);
      this.questionText = "";
      this.answerOptions = [];
    });
  };

  handleAddAnswerOption = () => {
    runInAction(() => {
      this.answerOptions.push({ optionName: "", isChecked: false });
    });
  };

  handleAnswerOptionChange = (index, key, value) => {
    runInAction(() => {
      this.answerOptions[index][key] = value;
    });
  };

  handleCheckboxChange = (index) => {
    runInAction(() => {
      this.answerOptions[index].isChecked = !this.answerOptions[index].isChecked;
    });
  };

  handleSubmitQuiz = async (userID) => {
    try {
      const userId = userID

      const quizData = {
        title: this.quizTitle,
        userId: userId,
        questions: this.questions,
      };
      const response = await fetch("https://quizbackend-gtn6.onrender.com/create-quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Quiz posted successfully");

      const responseData = await response.json()

      // console.log( `The Quiz ${title} is created successfully by the user of ${user} & the quiz Id is ${id}`)


      runInAction(() => {
        this.quizTitle = "";
        this.questionText = "";
        this.answerOptions = [];
        this.questions = [];
        this.quizResponse = responseData;
      });
    } catch (error) {
      console.error("Quiz post error:", error);
    }
  };
}

const quizStore = new QuizStore();

const CreateQuiz = observer(({ userId }) => {
  return (
    <>
      <input
        type="text"
        placeholder="Enter Quiz title"
        value={quizStore.quizTitle}
        onChange={quizStore.handleQuizTitleChange}
      />

      <form onSubmit={quizStore.handleAddQuestion}>
        <input
          type="text"
          placeholder="Enter Question"
          value={quizStore.questionText}
          onChange={(e) => (quizStore.questionText = e.target.value)}
        />
        {quizStore.answerOptions.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Enter Answer Option ${index + 1}`}
              value={option.optionName}
              onChange={(e) => quizStore.handleAnswerOptionChange(index, "optionName", e.target.value)}
            />
            <input
              type="checkbox"
              checked={option.isChecked}
              onChange={() => quizStore.handleCheckboxChange(index)}
            />
          </div>
        ))}
        <button type="button" onClick={quizStore.handleAddAnswerOption}>
          Add Answer Option
        </button>
        <button type="submit">Add Question</button>
      </form>
      {/* <button type="button" onClick={quizStore.handleSubmitQuiz(userId)}> */}
      <button type="button" onClick={() => quizStore.handleSubmitQuiz(userId)}>
        Submit Quiz
      </button>

      {quizStore.quizResponse && 
        <>
          {`${quizStore.quizResponse.quiz.title} is created successfully by the userId ${quizStore.quizResponse.quiz.userId}, the quiz id is ${quizStore.quizResponse.quiz.id}`}
       </>
      }


      <h2>Added Questions:</h2>
      <ul>
        {quizStore.questions.map((question, index) => (
          <li key={index}>
            <h3>{question.questionText}</h3>
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>
                  {answer.optionName} {answer.isChecked ? "(Correct)" : ""}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
});

export default CreateQuiz;
