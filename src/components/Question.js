import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  answerCorrectly,
  incrementQuestionNumber,
} from '../reducers/triviaReducer';
import QuestionOption from './QuestionOption';
import Timer from './Timer';

const Question = () => {
  const timeAllowed = 30;

  const timer = useRef(null);

  const [answerWasSubmitted, setAnswerWasSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeAllowed);

  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.currentIndex);
  const questions = useSelector((state) => state.questions);

  const { correct, options, question } = questions[currentIndex];

  const answerQuestion = () => {
    setAnswerWasSubmitted(true);

    if (correct === selectedOption) {
      dispatch(answerCorrectly(timeLeft));
    }
  };

  const getNextQuestion = () => {
    setSelectedOption(null);
    setAnswerWasSubmitted(false);
    dispatch(incrementQuestionNumber());
    setTimeLeft(timeAllowed);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    answerQuestion();
  };

  const handleTimer = () => {
    if (answerWasSubmitted) {
      clearTimeout(timer.current);
    } else if (timeLeft > 0) {
      timer.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      answerQuestion();
    }
  };

  useEffect(handleTimer, [answerWasSubmitted, timeLeft]);

  return (
    <div className="w-5/6 max-w-2xl mx-auto my-8">
      <Timer timeLeft={timeLeft} timeAllowed={timeAllowed} />
      <p className="text-gray-500 font-bold text-2xl">
        Question {currentIndex + 1}
        <span className="font-normal text-xl">/{questions.length}</span>
      </p>
      <p className="font-bold my-3 text-left text-lg">{question}</p>
      <form onSubmit={handleSubmit}>
        {options.map((option) => (
          <QuestionOption
            answerWasSubmitted={answerWasSubmitted}
            correct={correct}
            key={option}
            onOptionChange={handleOptionChange}
            option={option}
            selectedOption={selectedOption}
          />
        ))}
        {!answerWasSubmitted && (
          <button
            className="bg-blue-500 hover:bg-blue-700 bg-opacity-75 px-6 py-2 rounded-full"
            disabled={selectedOption === null}
            type="submit"
          >
            Answer
          </button>
        )}
      </form>
      {answerWasSubmitted && (
        <button
          className="bg-blue-500 hover:bg-blue-700 bg-opacity-75 px-6 py-2 rounded-full"
          onClick={getNextQuestion}
          type="button"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Question;
