import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Gamer from '../../interfaces/gamer';
import * as authService from '../../services/auth.service';
import { fetchGamerById } from '../../services/gamer.service';

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
    localStorage.setItem('userId', response.id);
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

export const fetchOneGamerById = createAsyncThunk(
  'gamer/fetchGamerById',
  async (payload: string) => {
    const response = await fetchGamerById(payload);
    return response;
  },
);

export const toggleChatRoomToFavouriteList = createAsyncThunk(
  'gamer/toggleChatRoomToFavourite',
  async (payload: { userId: number; favouriteGameChats: { id: number }[] }) => {
    const { userId, favouriteGameChats } = payload;
    const response = await authService.toggleChatRoomToFavourite(
      userId,
      favouriteGameChats,
    );
    return response;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      console.log('logout');
      localStorage.setItem('userId', '');
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        return { ...action.payload, status: 'succeeded' };
      }),
      builder.addCase(login.rejected, (state) => {
        state.status = 'failed';
        //state.error = action.error.message;
      }),
      builder.addCase(register.pending, (state) => {
        state.status = 'loading';
      }),
      builder.addCase(register.fulfilled, (state, action) => {
        return { ...action.payload, status: 'succeeded' };
      }),
      builder.addCase(register.rejected, (state) => {
        state.status = 'failed';
        //state.error = action.error.message;
      }),
      builder.addCase(fetchOneGamerById.pending, (state, action) => {
        state.status = 'loading';
      }),
      builder.addCase(fetchOneGamerById.fulfilled, (state, action) => {
        // Add any fetched posts to the array
        return { ...action.payload, status: 'succeeded' };
      }),
      builder.addCase(fetchOneGamerById.rejected, (state, action) => {
        state.status = 'failed';
        //state.error = action.error.message;
      }),
      builder.addCase(
        toggleChatRoomToFavouriteList.pending,
        (state, action) => {
          state.status = 'loading';
        },
      ),
      builder.addCase(
        toggleChatRoomToFavouriteList.fulfilled,
        (state, action) => {
          // Add any fetched posts to the array
          return { ...action.payload, status: 'succeeded' };
        },
      ),
      builder.addCase(
        toggleChatRoomToFavouriteList.rejected,
        (state, action) => {
          state.status = 'failed';
          //state.error = action.error.message;
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
