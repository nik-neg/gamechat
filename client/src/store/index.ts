import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './reducers/games';
import authReducer from './reducers/auth';
import usersReducer from './reducers/users';

const store = configureStore({
  reducer: {
    games: gamesReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
