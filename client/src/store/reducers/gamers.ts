import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Gamer from '../../interfaces/gamer';
import {
  fetchAllGamers,
  fetchAllGamersFromChatRoom,
  fetchGamerById,
} from '../../services/gamer.service';

const initialState: {
  status: string;
  ids: number[];
  entities: { [id: string]: Gamer };
  //error: string;
} = {
  status: 'idle',
  ids: [],
  entities: {},
  //error: '',
};

export const fetchGamers = createAsyncThunk('gamers/fetchGamers', async () => {
  const response = await fetchAllGamers();
  return response;
});

export const fetchGamersFromChatRoom = createAsyncThunk(
  'gamers/fetchGamersFromChatRoom',
  async (id: string) => {
    const response = await fetchAllGamersFromChatRoom(id);
    return response;
  },
);

const normalizationState = (arr: Gamer[]) => {
  const ids: number[] = arr.map((gamer) => gamer.id);
  const entities: { [id: string]: Gamer } = {};
  arr.forEach((gamer) => {
    entities[gamer.id] = { ...gamer };
  });
  return { ids, entities };
};

const usersSlice = createSlice({
  name: 'gamer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGamers.pending, (state) => {
      state.status = 'loading';
    }),
      builder.addCase(fetchGamers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        const { ids, entities } = normalizationState(action.payload);
        state.ids = ids;
        state.entities = entities;
      }),
      builder.addCase(fetchGamers.rejected, (state) => {
        state.status = 'failed';
        //state.error = action.error.message;
      }),
      builder.addCase(fetchGamersFromChatRoom.pending, (state) => {
        state.status = 'loading';
      }),
      builder.addCase(fetchGamersFromChatRoom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        const { ids, entities } = normalizationState(action.payload);
        state.ids = ids;
        state.entities = entities;
      }),
      builder.addCase(fetchGamersFromChatRoom.rejected, (state) => {
        state.status = 'failed';
        //state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
