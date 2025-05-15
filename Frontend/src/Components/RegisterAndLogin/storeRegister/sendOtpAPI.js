import {
  SEND_OTP_LOADING,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAILURE,
} from "./actionTypesRegister";
import axios from "axios";

export const sendOtpAPI = (email, name) => (dispatch) => {
  dispatch({ type: SEND_OTP_LOADING });
  const data = {
    email: email,
    name: name,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .post("http://localhost:8080/api/otp/send-otp", data, {
      headers: headers,
    })
    .then((res) => {
      dispatch({ type: SEND_OTP_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: SEND_OTP_FAILURE, payload: err.response.data });
    });
};
