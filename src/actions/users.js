import { saveQuestionAnswer } from "utils/api";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function answerQuestion({authedUser, qid, answer}) {
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