import { useState, useEffect } from "react";

export default function CelebrationModal({ onClose }) {
  const [visible, setVisible] = useState(false);

  // List of random winner images
  const winnerImages = [
    "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    "https://media.giphy.com/media/l3vR85PnGsBwu1PFK/giphy.gif",
    "https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif",
    "https://media.giphy.com/media/26AHONQ79FdWZhAI0/giphy.gif",
    "https://media.giphy.com/media/3o7abldj0b3rxrZUxW/giphy.gif",
  ];

  // List of fun facts
  const funFacts = [
    "Did you know? Honey never spoils!",
    "Fun Fact: Octopuses have three hearts!",
    "Mind-blowing: Bananas are berries, but strawberries aren’t!",
    "Trivia: The Eiffel Tower can be 15 cm taller in the summer!",
    "Did you know? A single lightning bolt is five times hotter than the sun!",
  ];

  // Pick a random image & fun fact
  const randomImage = winnerImages[Math.floor(Math.random() * winnerImages.length)];
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);

    // Play sound effect
    const victorySound = new Audio("https://www.myinstants.com/media/sounds/tada-fanfare-a.mp3");
    victorySound.play();

  }, []);

  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-bold text-green-500 mb-4">🎉 PERFECT SCORE! 🎉</h2>
          <p className="text-lg font-semibold">You are a quiz master! 🏆</p>
          <img src={randomImage} alt="Winner Celebration" 
            className="mx-auto my-4 w-48 h-48 rounded-full shadow-lg" />
          <p className="italic text-gray-700 mt-2">💡 {randomFact}</p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4" 
            onClick={() => { setVisible(false); setTimeout(() => onClose(), 300); }}>
            Continue
          </button>
        </div>
      </div>
    )
  );
}
