import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import websiteAnalizationReducer from "../slices/websiteAnalyzationSlice";

export const store = configureStore({
  reducer: {
    websiteAnalization: websiteAnalizationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
