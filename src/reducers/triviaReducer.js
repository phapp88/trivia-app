import data from '../data';

const initialState = {
  correctAnswers: 0,
  currentIndex: null,
  questions: [],
  score: 0,
};

const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = 0; i < shuffled.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  return shuffled;
};

export const getRoundOfQuestions = () => {
  const allQuestions = data.map((obj) => {
    const { correct, incorrect, question } = obj;
    const options = shuffleArray([correct, ...incorrect]);
    return { correct, options, question };
  });
  return shuffleArray(allQuestions).slice(0, 10);
};

const triviaReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ANSWER_CORRECTLY':
      return {
        ...state,
        correctAnswers: state.correctAnswers + 1,
        score: state.score + action.payload.score,
      };
    case 'INCREMENT_QUESTION_NUMBER':
      return { ...state, currentIndex: state.currentIndex + 1 };
    case 'START_ROUND':
      return {
        correctAnswers: 0,
        currentIndex: 0,
        questions: action.payload.questions,
        score: 0,
      };
    default:
      return state;
  }
};

export const answerCorrectly = (score) => ({
  type: 'ANSWER_CORRECTLY',
  payload: { score },
});

export const incrementQuestionNumber = () => ({
  type: 'INCREMENT_QUESTION_NUMBER',
});

export const startRound = () => ({
  type: 'START_ROUND',
  payload: {
    questions: getRoundOfQuestions(),
  },
});

export default triviaReducer;
