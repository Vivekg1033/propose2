import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import heartAnimation from './assets/heartAnimation.json'; // Heart Animation JSON
import fireworksAnimation from './assets/fireworks.json'; // Fireworks Animation JSON
import puzzleImage from './assets/background.jpg'; // Puzzle Image

import { motion } from "framer-motion"; // For smooth animations

import './App.css';

const questions = [
  "What is your favorite memory with me?",
  "Where did we first meet?",
  "What was your first impression of me?",
  "What is one thing you love about me?",
  "What was the happiest moment we shared?",
  "Where would you want to go for our first vacation?",
  "What is something you've always wanted to tell me?",
  "What is your favorite thing about our relationship?",
  "How do you see us in the future?",
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/level/:level" element={<LevelPage />} />
        <Route path="/end" element={<EndPage />} />
      </Routes>
    </Router>
  );
};

const WelcomePage = () => {
  const navigate = useNavigate();

  const startJourney = () => {
    navigate("/level/1");
  };

  return (
    <div className="welcome-page">
      <Lottie options={{ animationData: heartAnimation, loop: true }} height={400} width={400} />
      <h1>Welcome to Our Journey!</h1>
      <p>Click below to begin our love story!</p>
      <button onClick={startJourney} className="start-btn">Start Journey</button>
    </div>
  );
};

const LevelPage = () => {
  const navigate = useNavigate();
  const { level } = useParams();
  const [input, setInput] = useState("");
  const [heartPosition, setHeartPosition] = useState(level);

  const handleAnswer = () => {
    if (parseInt(level) < 9) {
      setHeartPosition(parseInt(level) + 1); // Move the heart forward
      navigate(`/level/${parseInt(level) + 1}`);
    } else {
      navigate("/end");
    }
  };

  return (
    <div className="level-page">
      <motion.div
        className="heart-container"
        initial={{ x: -300 }}
        animate={{ x: heartPosition * 150 }} // Heart moves based on the level
        transition={{ duration: 1 }}
      >
        <Lottie options={{ animationData: heartAnimation, loop: true }} height={100} width={100} />
      </motion.div>

      <div className="road">
        <div className="stop" style={{ left: `${heartPosition * 150}px` }}>
          <img src={`https://via.placeholder.com/150?text=Memory+${heartPosition}`} alt={`Memory ${heartPosition}`} className="stop-image" />
        </div>
      </div>

      <h2>Level {level}</h2>
      <p>{questions[parseInt(level) - 1]}</p>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your answer"
        className="answer-input"
      />
      <button onClick={handleAnswer} className="submit-btn">Submit</button>
    </div>
  );
};

const EndPage = () => {
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);

  const handlePuzzleCompletion = () => {
    setPuzzleCompleted(true);
  };

  return (
    <div className="end-page">
      <h2>Final Question: Will you be with me forever?</h2>
      {!puzzleCompleted ? (
        <div className="puzzle">
          <h3>Arrange the pieces of our love!</h3>
          <div className="puzzle-container">
            <img src={puzzleImage} alt="Puzzle" className="puzzle-image" />
            <button onClick={handlePuzzleCompletion} className="done-btn">Done</button>
          </div>
        </div>
      ) : (
        <div className="final-message">
          <Lottie options={{ animationData: fireworksAnimation, loop: true }} height={400} width={400} />
          <h1>I knew you would say YES! You're stuck with me forever.</h1>
          <button onClick={() => alert("Celebrate with me!")} className="celebrate-btn">Celebrate</button>
        </div>
      )}
    </div>
  );
};

export default App;
