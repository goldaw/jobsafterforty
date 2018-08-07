import C_feedback from '../constants/feedback';

export const dismissFeedback = num => dispatch =>
  dispatch({ type: C_feedback.FEEDBACK_DISMISS, num });
