import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Game from '../../interfaces/game';
import { fetchAllGamesFromDB } from '../../services/game.service';

const initialState: {
  status: string;
  ids: number[];
  entities: { [id: string]: Game };
  //error: string;
} = {
  status: 'idle',
  ids: [],
  entities: {},
  //error: '',
};

export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await fetchAllGamesFromDB();
  return response;
});

//fetchAllGamesFromDB
//export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
//  const response = await fetchAllGamesFromAPI();
//  return response;
//});

const normalizationState = (arr: Game[]) => {
  const ids: number[] = arr.map((game) => game.id);
  const entities: { [id: string]: Game } = {};
  arr.forEach((game) => {
    entities[game.id] = { ...game };
  });
  return { ids, entities };
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    getAllGames: (state, action) => {
      const { ids, entities } = normalizationState(action.payload);
      state.ids = ids;
      state.entities = entities;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = 'loading';
    }),
      builder.addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        const { ids, entities } = normalizationState(action.payload);
        state.ids = ids;
        state.entities = entities;
      }),
      builder.addCase(fetchGames.rejected, (state) => {
        state.status = 'failed';
        //state.error = action.error.message;
      });
  },
});

export const { getAllGames } = gamesSlice.actions;
export default gamesSlice.reducer;
