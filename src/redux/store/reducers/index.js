import { combineReducers } from "redux";
import authReducer from "./authReducer"; 
import registerReducer from "./registerReducer";
import forgotPasswordReducer from "./forgotPasswordReducer";
import superAdminReducer from "./superAdminReducer";
import { clearAllMessages } from "../actions/clearMessagesActions";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  recoverPassword: forgotPasswordReducer,
  clearMessages: clearAllMessages,
  superadmin: superAdminReducer, 
});

export default rootReducer;
