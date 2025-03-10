import { useState, useRef  } from "react";
import Confetti from "react-confetti";
export default function QuizQuestion({ question, options, correctAnswer, onAnswerSelect }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
  
    const questionRef = useRef(null);
    const handleAnswerClick = (answer) => {
        if (selectedAnswer === null) {
            setSelectedAnswer(answer);
            onAnswerSelect(answer, correctAnswer);
            const isCorrect = answer === correctAnswer;
            if (isCorrect) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 1500); 
            }
        }
    };

  
    return (
        <div  ref={questionRef} className="relative bg-white p-4 rounded-lg shadow-md mb-4 overflow-hidden">

            
{showConfetti && questionRef.current && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <Confetti
                        width={questionRef.current.offsetWidth}
                        height={questionRef.current.offsetHeight}
                        numberOfPieces={300} // Adjust for burst size
                        gravity={0.4} // Control pop speed
                        wind={0}
                        recycle={false} // Custom colors
                    />
                </div>
            )}
            <p className="font-semibold mb-2">{question}</p>
            <ul>
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`p-2 rounded-md cursor-pointer transition-all duration-300 
                            ${selectedAnswer
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
