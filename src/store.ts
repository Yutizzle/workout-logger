import { configureStore } from '@reduxjs/toolkit';

import NewProgramReducer from './slices/NewProgramSlice';

export const store = configureStore({
  reducer: {
    newProgramWorkouts: NewProgramReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
