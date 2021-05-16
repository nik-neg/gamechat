import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ids: [],
  entities: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
