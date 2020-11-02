import React from 'react';
import { useDispatch } from 'react-redux';
import { startRound } from '../reducers/triviaReducer';

const StartScreen = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startRound());
  };

  return (
    <div className="my-12">
      <div>
        <h1 className="leading-none inline-block bg-gradient-to-br from-red-500 via-pink-500 to-purple-400 bg-clip-text text-6xl font-bold text-transparent">
          Trivia Crush
        </h1>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 bg-opacity-75 m-6 px-6 py-2 rounded-full"
        onClick={handleClick}
      >
        Start
      </button>
    </div>
  );
};

export default StartScreen;
