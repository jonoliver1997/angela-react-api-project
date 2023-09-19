import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      const data = await response.json();
      // Extract the "results" array from the API response
      const questionsArray = data.results;
      setQuestions(questionsArray);
    } catch (error) {
      console.log(error);
    }
  };

  return <Quiz questions={questions} />;
}

export default App;
