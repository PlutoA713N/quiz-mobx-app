import { useState } from "react";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answerOptions, setAnswerOptions] = useState([]);
  const [questions, setQuestions] = useState([]);

  let userId = 0

  const handleAddQuestion = (e) => {
    e.preventDefault();

    if (!questionText.trim()) {
        console.error("Question text cannot be empty");
        return;
      }

      if (answerOptions.some(option => !option.optionName.trim())) {
        console.error("Answer option cannot be empty");
        return;
      }
      
    const newQuestion = {
      questionText: questionText,
      answers: answerOptions.map((answer) => ({
        optionName: answer.optionName,
        isChecked: answer.isChecked,
      })),
    };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setAnswerOptions([]);
  };

  const handleAddAnswerOption = () => {
    setAnswerOptions([...answerOptions, { optionName: "", isChecked: false }]);
  };

  const handleAnswerOptionChange = (index, key, value) => {
    const updatedAnswerOptions = [...answerOptions];
    updatedAnswerOptions[index][key] = value;
    setAnswerOptions(updatedAnswerOptions);
  };

  const handleCheckboxChange = (index) => {
    const updatedAnswerOptions = [...answerOptions];
    updatedAnswerOptions[index].isChecked = !updatedAnswerOptions[index].isChecked;
    setAnswerOptions(updatedAnswerOptions);
  };

  const handleSubmitQuiz = async () => {
    try {
      const quizData = {
        title: quizTitle,
        userId: userId += 0.1,
        questions: questions,
      };
      const response = await fetch('http://localhost:1337/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Quiz posted successfully');
      setQuizTitle("");
      setQuestionText("");
      setAnswerOptions([]);
      setQuestions([]);
    } catch(error) {
      console.error("Quiz post error:", error);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Quiz title"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />

      <form onSubmit={handleAddQuestion}>
        <input
          type="text"
          placeholder="Enter Question"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {answerOptions.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Enter Answer Option ${index + 1}`}
              value={option.optionName}
              onChange={(e) => handleAnswerOptionChange(index, 'optionName', e.target.value)}
            />
            <input
              type="checkbox"
              checked={option.isChecked}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAnswerOption}>
          Add Answer Option
        </button>
        <button type="submit">Add Question</button>
      </form>
      <button type="button" onClick={handleSubmitQuiz}>Submit Quiz</button>

      <h2>Added Questions:</h2>
      <ul>
        {questions.map((question, index) => (
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
};

export default CreateQuiz;
