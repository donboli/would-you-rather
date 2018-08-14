import { showLoading, hideLoading } from 'react-redux-loading-bar'

import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authedUser';

// TODO: make user selectable
export const CREATE_QUESTION = 'CREATE_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
const authedUser = localStorage.getItem('authedUser');

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(setAuthedUser(authedUser));
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(hideLoading());
      });
  };
}

function createQuestion(question) {
  return {
    type: CREATE_QUESTION,
    question
  }
}

export function handleSaveQuestion({ optionOneText, optionTwoText }, cb) {
  return (dispatch, getState) => {
    saveQuestion({
      optionOneText,
      optionTwoText,
      author: getState().authedUser
    })
    .then((question) => dispatch(createQuestion(question)))
    .then(cb);
  }
}

export function answerQuestion({ authedUser, qid, answer }) {
  return {
    type: ANSWER_QUESTION,
    authedUser,
    qid,
    answer
  };
}

export function handleAnswerQuestion({ qid, answer }, cb) {
  return (dispatch, getState) => {
    const data = {
      authedUser: getState().authedUser,
      qid,
      answer
    }

    saveQuestionAnswer(data)
      .then(() => dispatch(answerQuestion(data)))
      .then(cb);
  }
}