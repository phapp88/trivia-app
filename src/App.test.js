import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';
import App from './App';
import triviaReducer, {
  answerCorrectly,
  incrementQuestionNumber,
  startRound,
} from './reducers/triviaReducer';

describe('<App />', () => {
  let component;
  const store = createStore(triviaReducer);

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('shows the main screen', () => {
    expect(component.getByText('Trivia Crush')).toBeInTheDocument();
    expect(component.getByText('Start')).toBeInTheDocument();
  });

  it('shows the first question when the start button is clicked', () => {
    const startButton = component.getByText('Start');

    fireEvent.click(startButton);

    expect(component.getByText('Question 1')).toBeInTheDocument();
  });

  it(`shows the user's score after they answer every question correctly`, () => {
    const scoreAmount = 5;

    store.dispatch(startRound());

    const { questions } = store.getState();

    for (let i = 0; i < questions.length; i++) {
      store.dispatch(answerCorrectly(scoreAmount));
      store.dispatch(incrementQuestionNumber());
    }

    expect(component.getByText('Questions: 10/10')).toBeInTheDocument();
    expect(
      component.getByText(`Score: ${questions.length * scoreAmount}`),
    ).toBeInTheDocument();
  });

  it(`shows the user's score after they answer every question incorrectly`, () => {
    store.dispatch(startRound());

    const { questions } = store.getState();

    for (let i = 0; i < questions.length; i++) {
      store.dispatch(incrementQuestionNumber());
    }

    expect(component.getByText('Questions: 0/10')).toBeInTheDocument();
    expect(component.getByText('Score: 0')).toBeInTheDocument();
  });
});
