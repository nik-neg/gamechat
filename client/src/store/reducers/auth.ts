import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
