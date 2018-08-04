import { getInitialData, saveQuestion } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';

// TODO: make user selectable
const AUTHED_ID = 'johndoe'
export const CREATE_QUESTION = 'CREATE_QUESTION'

export function handleInitialData () {
  return (dispatch) => {
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
      });
  };
}

function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  }
}

export function handleSaveQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    saveQuestion({
      optionOneText,
      optionTwoText,
      author: getState().authedUser
    })
    .then((question) => {
      dispatch(createQuestion(question))
    });
  }
}