let request = require('superagent');

const SEND_EMAIL = 'redux-eltrue/eltrue/sendEmail';
const SEND_EMAIL_SUCCESS = 'redux-eltrue/eltrue/sendEmailSuccess';
const SEND_EMAIL_FAIL = 'redux-eltrue/eltrue/sendEmailFail';

const initialState = {};

export default function EmailReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        emailSendingStatus: 'SUCCESS'
      };
    case SEND_EMAIL_FAIL:
      return {
        ...state,
        emailSendingStatus: 'ERROR'
      };
    default:
      return state;
  }
}


const sendEmailCall = requestObj => {
  return new Promise((fulfill) => {
    request
      .post('/api/sendEmail')
      .send(requestObj)
      .set('Accept', 'application/json')
      .end((err, res) => {
        fulfill(res);
      });
  });
};

export function sendEmail(requestObj) {
  return dispatch => {
    return sendEmailCall(requestObj)
      .then((response) => {
        if (response.body.status === 'OK') {
          dispatch({
            type: SEND_EMAIL_SUCCESS
          });
        } else {
          dispatch({
            type: SEND_EMAIL_FAIL
          });
        }
      });
  }
}