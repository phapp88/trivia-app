import React from 'react';
import { useSelector } from 'react-redux';
import Question from './components/Question';
import ScoreScreen from './components/ScoreScreen';
import StartScreen from './components/StartScreen';

const App = () => {
  const currentIndex = useSelector((state) => state.currentIndex);
  const questions = useSelector((state) => state.questions);

  let componentToShow;

  if (questions.length === 0) {
    componentToShow = <StartScreen />;
  } else if (currentIndex < questions.length) {
    componentToShow = <Question />;
  } else {
    componentToShow = <ScoreScreen />;
  }

  return <>{componentToShow}</>;
};

export default App;
