import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import Question from './Question';
import triviaReducer, {
  answerCorrectly,
  getRoundOfQuestions,
} from '../reducers/triviaReducer';

describe('<Question />', () => {
  let component;
  const initialState = {
    currentIndex: 0,
    questions: getRoundOfQuestions(),
    score: 0,
  };

  beforeEach(() => {
    const store = createStore(triviaReducer, initialState);

    component = render(
      <Provider store={store}>
        <Question />
      </Provider>,
    );
  });

  it('shows the four options of the first question', () => {
    const { question, options } = initialState.questions[0];

    expect(component.getByText('Question 1')).toBeInTheDocument();
    expect(component.getByText(question)).toBeInTheDocument();
    options.forEach((option) => {
      expect(component.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it('prevents the user from clicking the answer button if they have not selected an option', () => {
    expect(component.getByText('Answer')).toBeDisabled();
  });

  it('adds green background to the selected option if it is correct', () => {
    const { correct } = initialState.questions[0];

    const correctOption = component.getByLabelText(correct);
    const answerButton = component.getByText('Answer');

    fireEvent.click(correctOption);
    fireEvent.click(answerButton);

    expect(correctOption.closest('div')).toHaveClass('bg-green-500');
  });

  it('adds a red background to an incorrect selected option and a green background to the correct option', () => {
    const { correct, options } = initialState.questions[0];

    const incorrectIndex = options.findIndex((option) => option !== correct);

    const correctOption = component.getByLabelText(correct);
    const incorrectOption = component.getByLabelText(options[incorrectIndex]);
    const answerButton = component.getByText('Answer');

    fireEvent.click(incorrectOption);
    fireEvent.click(answerButton);

    expect(correctOption.closest('div')).toHaveClass('bg-green-500');
    expect(incorrectOption.closest('div')).toHaveClass('bg-red-500');
  });

  it(`shows the next question after the user answers a question and clicks the 'Next Question' button`, () => {
    const { correct: firstCorrect } = initialState.questions[0];
    const {
      question: secondQuestion,
      options: secondOptions,
    } = initialState.questions[1];

    const correctOption = component.getByLabelText(firstCorrect);
    const answerButton = component.getByText('Answer');

    fireEvent.click(correctOption);
    fireEvent.click(answerButton);

    const nextButton = component.getByText('Next Question');

    fireEvent.click(nextButton);

    expect(component.getByText('Question 2')).toBeInTheDocument();
    expect(component.getByText(secondQuestion)).toBeInTheDocument();
    secondOptions.forEach((option) => {
      expect(component.getByLabelText(option)).toBeInTheDocument();
    });
  });
});
