import { configureStore } from '@reduxjs/toolkit';
import { fetchApi } from './dataSlice';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const store = configureStore({
  reducer: {
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

// Включите эту строку, чтобы настроить обработку локальных событий (опционально)
setupListeners(store.dispatch);

export default store;