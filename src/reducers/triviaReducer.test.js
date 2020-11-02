import deepFreeze from 'deep-freeze';
import data from '../data';
import triviaReducer, { getRoundOfQuestions } from './triviaReducer';

describe('getRoundOfQuestions()', () => {
  it('returns an array of 10 questions with no repeats', () => {
    const allQuestions = data;
    const roundOfQuestions = getRoundOfQuestions(allQuestions);

    expect(roundOfQuestions).toHaveLength(10);
    roundOfQuestions.forEach((question, index, questions) => {
      const remainingQuestions = questions.slice(index + 1);
      expect(remainingQuestions.findIndex((q) => q.question === question)).toBe(
        -1,
      );
    });
  });
});

describe('triviaReducer', () => {
  it('action START_ROUND resets state with an array of 10 new questions', () => {
    const state = {
      correctAnswers: 8,
      currentIndex: 10,
      questions: [],
      score: 100,
    };
    const action = {
      type: 'START_ROUND',
      payload: {
        questions: getRoundOfQuestions(),
      },
    };

    deepFreeze(state);

    const nextState = triviaReducer(state, action);

    expect(nextState.currentIndex).toBe(0);
    expect(nextState.currentIndex).toBe(0);
    expect(nextState.questions).toHaveLength(10);
    expect(nextState.questions).toEqual(action.payload.questions);
    expect(nextState.score).toBe(0);
  });

  it('action ANSWER_CORRECTLY increments the number of correct answers and increases score', () => {
    const state = {
      correctAnswers: 0,
      currentIndex: 0,
      questions: [],
      score: 0,
    };
    const action = {
      type: 'ANSWER_CORRECTLY',
      payload: { score: 5 },
    };

    deepFreeze(state);

    const nextState = triviaReducer(state, action);

    expect(nextState.correctAnswers).toBe(1);
    expect(nextState.score).toBe(5);
  });

  it('action INCREMENT_QUESTION_NUMBER increments current index', () => {
    const state = {
      correctAnswers: 0,
      currentIndex: 0,
      questions: [],
      score: 0,
    };
    const action = { type: 'INCREMENT_QUESTION_NUMBER' };

    deepFreeze(state);

    const nextState = triviaReducer(state, action);

    expect(nextState.currentIndex).toBe(1);
  });
});
