import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRound } from '../reducers/triviaReducer';

const ScoreScreen = () => {
  const dispatch = useDispatch();

  const correctAnswers = useSelector((state) => state.correctAnswers);
  const questions = useSelector((state) => state.questions);
  const score = useSelector((state) => state.score);

  const handleButtonClick = () => {
    dispatch(startRound());
  };

  return (
    <div className="my-12">
      <p className="text-4xl">Great Job!</p>
      <p className="text-2xl">
        Questions: {correctAnswers}/{questions.length}
      </p>
      <p className="text-2xl">Score: {score}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 bg-opacity-75 m-2 px-6 py-2 rounded-full"
        onClick={handleButtonClick}
      >
        Play Again
      </button>
    </div>
  );
};

export default ScoreScreen;
