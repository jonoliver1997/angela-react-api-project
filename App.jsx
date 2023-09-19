import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";

function App() {
  const [questions, setQuestions] = useState(null);

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

  return (
    <div className="App">
    {questions ? <Quiz questions={questions} /> : <h2>Loading...</h2>
    /* This prevents the Quiz component from rendering before the data from API is returned, once all of the data is available, then Quiz component can render, otherwise you get an error stating  "questions" is undefined */}
    </div> 
  );
}

export default App;
