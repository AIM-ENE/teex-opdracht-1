import { FetchStrategies } from "./Gateways";

const fetchQuestion = (index, setSquestion, setIndex) => {
    fetchQuestionUsingStrategy("fetch", index, setSquestion, setIndex);
}

const fetchQuestionUsingStrategy = (strategy, index, setQuestion, setIndex) => {
  const url = `http://localhost:8080/api/examQuestions/open/${index}`;
  const options = {}; // Add any required options here

  FetchStrategies[strategy](url, options)
    .then((data) => {
      setQuestion(data);
      setIndex(index);
    })
    .catch((error) => {
      console.error("Error fetching question:", error);
    });
};

export default fetchQuestion;