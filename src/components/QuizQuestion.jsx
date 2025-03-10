import { useState } from "react";

export default function QuizQuestion({ question, options, correctAnswer, onAnswerSelect }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleAnswerClick = (answer) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answer);
            onAnswerSelect(answer === correctAnswer);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="font-semibold mb-2">{question}</p>
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`p-2 rounded-md cursor-pointer transition-all duration-300 
                            ${
                                selectedAnswer
                                    ? option === correctAnswer
                                        ? "bg-green-500 text-white"
                                        : option === selectedAnswer
                                        ? "bg-red-500 text-white"
                                        : "bg-gray-100"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                        onClick={() => handleAnswerClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}
