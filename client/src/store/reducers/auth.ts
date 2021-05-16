import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Gamer from '../../interfaces/gamer';
import * as authService from '../../services/auth.service';

interface authReducerType extends Gamer {
  status: string;
}

const initialState: authReducerType = {
  status: 'idle',
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  language: '',
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: { email: string; password: string }) => {
    console.log(`payload`, payload);
    const response = await authService.login(payload.email, payload.password);
    return response;
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async (payload: Gamer) => {
    const response = await authService.register(payload);
    return response;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.status = 'loading';
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        return { ...action.payload, status: 'succeeded' };
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message;
      }),
      builder.addCase(register.pending, (state, action) => {
        state.status = 'loading';
      }),
      builder.addCase(register.fulfilled, (state, action) => {
        return { ...action.payload, status: 'succeeded' };
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
