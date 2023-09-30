import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";

export const store = configureStore({
	reducer: {
		userSlice: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
