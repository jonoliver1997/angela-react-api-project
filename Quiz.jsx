import { useState, useEffect } from "react";

//added this function to shuffle the order of the choices
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answerCorrect, setAnswerCorrect] = useState(null); // Renamed for clarity
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  const { question, incorrect_answers, correct_answer } = questions[currentQuestion]; // used to say const {question, choices, correctAnswer} = questions[currentQuestion]; but that was wrong, have to use the names from the API for the variables here. If you want to change variable names you would have to do const {question, incorrect_answers: choices, correct_answer: correctAnswer} = questions[currentQuestion]; in this method you would be able to rename the variables and use {questions, choices and correctAnswer}

  const choices = [...incorrect_answers, correct_answer]; // Combine incorrect and correct answers into one array

  useEffect(() => {
    // Shuffle choices only when the component mounts or when the question changes
    const shuffledChoices = shuffleArray(choices);
    setShuffledChoices(shuffledChoices);
  }, [currentQuestion, questions]);

  const onAnswerClick = (selectedAnswer, index,) => {
    setAnswerIndex(index);
    if (selectedAnswer === correct_answer) {
      setAnswerCorrect(true);
    } else {
      setAnswerCorrect(false);
    }
  };

  const onClickNext = () => {
    setAnswerIndex(null);
    setResult((prev) =>
      answerCorrect
        ? {
            ...prev,
            score: prev.score + 10,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
  };

  

  return (
    <div className="quiz-container">
      {!showResult ? (
        <>
          <span className="active-question-number">
            {currentQuestion + 1}
          </span>
          <span className="total-questions">/{questions.length}</span>
          <h2>{question}</h2>
          <ul>
            { shuffledChoices.map((answer, index) => (
              <li
                onClick={() => onAnswerClick(answer, index)}
                key={answer}
                className={answerIndex === index ? "selected-answer" : ""}
              >
                {answer}
              </li>
            ))}
          </ul>
          <div className="footer">
            <button onClick={onClickNext} disabled={answerIndex === null}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </>
      ) : (
        <div className="result">
          <h3>Result</h3>
          <p>
            Total Questions: <span>{questions.length}</span>
          </p>
          <p>
            Total Score: <span>{result.score}</span>
          </p>
          <p>
            Total Correct Answers: <span>{result.correctAnswers}</span>
          </p>
          <p>
            Total Wrong Answers: <span>{result.wrongAnswers}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
