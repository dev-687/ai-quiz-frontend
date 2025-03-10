import { useState } from "react";
import QuizQuestion from "./QuizQuestion";

export default function QuizApp() {
  const [subject, setSubject] = useState("");
  const [numQuestions, setNumQuestions] = useState(5); // Default number of questions
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [answersCount, setAnswersCount] = useState(0);

  const fetchQuiz = async () => {
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    setLoading(true);
    setError(null);

    // Reset quiz state before fetching new data
    setQuiz([]);
    setScore(0);
    setAnswersCount(0);

    try {
      const response = await fetch("https://ai-quiz-backend-psi.vercel.app/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, numQuestions }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.quizText) {
        throw new Error("Invalid quiz response from server.");
      }

      // Extract JSON inside the string (removes ```json and ``` if present)
      const cleanedJson = data.quizText.replace(/```json\n|\n```/g, "");

      // Parse it into a JavaScript object
      const parsedQuiz = JSON.parse(cleanedJson);

      if (!parsedQuiz.quiz || !Array.isArray(parsedQuiz.quiz)) {
        throw new Error("Invalid quiz format received.");
      }

      setQuiz(parsedQuiz.quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError("Failed to generate quiz. Please try again.");
      setQuiz([]);
    }

    setLoading(false);
  };

  const handleAnswerSelect = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setAnswersCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Quiz Generator</h1>

      <input
        type="text"
        placeholder="Enter a subject"
        className="w-full p-2 border rounded mb-2"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter number of questions"
        className="w-full p-2 border rounded mb-2"
        value={numQuestions}
        onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))}
      />

      <button
        className="w-full bg-blue-500 text-white p-2 rounded"
        onClick={fetchQuiz}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {quiz.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Quiz on {subject}</h2>
          <ul className="mt-2">
            {quiz.map((q, index) => (
              <QuizQuestion
                key={index}
                question={q.question}
                options={q.options}
                correctAnswer={q.answer}
                onAnswerSelect={handleAnswerSelect}
              />
            ))}
          </ul>
        </div>
      )}

      {answersCount === quiz.length && quiz.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">
            🎉 Your Score: {score} / {quiz.length}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            onClick={fetchQuiz}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}
