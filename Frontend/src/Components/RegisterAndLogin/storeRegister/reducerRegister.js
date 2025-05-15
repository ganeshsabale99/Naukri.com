import {
	REGISTER_FAILURE,
	REGISTER_LOADING,
	REGISTER_SUCCESS,
} from "./actionTypesRegister";

const initState = {
	loading: false,
	error: false,
	isReg: false,
	token: "",
};

const regReducer = (state = initState, { type, payload }) => {
	console.log("type", type, "payload", payload);
	switch (type) {
		case REGISTER_LOADING: {
			return { ...state, loading: true, error: false };
		}
		case REGISTER_SUCCESS: {
			// alert("Registration successful!");
			const successMessage = payload && payload.message ? payload.message : "Registration successful!";
			alert(successMessage);
			return {
				...state,
				loading: false,
				error: false,
				isReg: true,
				token: payload.message,
			};
		}
		case REGISTER_FAILURE: {
			const errorMessage = payload && payload.response && payload.response.data && payload.response.data.message
				? payload.response.data.message
				: "Registration failed. Please try again!";
			alert(errorMessage);
			return { ...state, loading: false, error: true, isReg: false };
		}
		default: {
			return state;
		}
	}
};

export default regReducer;
