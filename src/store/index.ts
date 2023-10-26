import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './modules/auth';
import { eventReducer } from './modules/event';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export interface ThunkApiType<T> {
  // Campos opcionais para definir os tipos dos campos da thunkApi
  dispatch: AppDispatch;
  state: T;
}