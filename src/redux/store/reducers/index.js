import { combineReducers } from "redux";
import authReducer from "../auth/authReducer"; 
import registerReducer from "../register/registerReducer";
import forgotPasswordReducer from "../recover-password-email/forgotPasswordReducer";
import superAdminReducer from "../superadmin/superAdminReducer";
import professorReducer from "../professor/professorReducer";
import studentReducer from "../student/studentReducer";
import { clearAllMessages } from "../shared/clearMessagesActions";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  recoverPassword: forgotPasswordReducer,
  clearMessages: clearAllMessages,
  superadmin: superAdminReducer, 
  professor: professorReducer,
  student: studentReducer
});

export default rootReducer;
